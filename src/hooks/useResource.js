import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { crudReducer, initialCrudState } from "@/lib/crudReducer";
import { useToast } from "./useToast";
import { useUndoableDelete } from "./useUndoableDelete";

/**
 * The CRUD engine every feature builds on.
 * Loads a collection, then exposes optimistic add / update / remove.
 * Pass an eventId to scope the collection to one event.
 */
export function useResource(api, eventId) {
  const [state, dispatch] = useReducer(crudReducer, initialCrudState);
  const [reloadKey, setReloadKey] = useState(0);
  const removedAt = useRef(new Map());
  const { toast } = useToast();

  useEffect(() => {
    let ignore = false;
    dispatch({ type: "loading" });
    api
      .list(eventId ? { eventId } : {})
      .then((items) => {
        if (!ignore) dispatch({ type: "loaded", items });
      })
      .catch((err) => {
        if (!ignore) dispatch({ type: "failed", error: err.message });
      });
    return () => {
      ignore = true;
    };
  }, [api, eventId, reloadKey]);

  const add = useCallback(
    async (values) => {
      const item = { ...values, id: nanoid(10), ...(eventId ? { eventId } : {}) };
      dispatch({ type: "added", item });
      try {
        await api.create(item);
      } catch (err) {
        dispatch({ type: "removed", id: item.id });
        toast({ message: `Couldn't save. ${err.message}`, tone: "error" });
      }
      return item;
    },
    [api, eventId, toast],
  );

  const update = useCallback(
    async (id, changes) => {
      const previous = state.items.find((i) => i.id === id);
      if (!previous) return;
      dispatch({ type: "updated", id, changes });
      try {
        await api.update(id, changes);
      } catch (err) {
        dispatch({ type: "updated", id, changes: previous });
        toast({ message: `Couldn't save changes. ${err.message}`, tone: "error" });
      }
    },
    [api, state.items, toast],
  );

  const hide = useCallback(
    (item) => {
      removedAt.current.set(
        item.id,
        state.items.findIndex((i) => i.id === item.id),
      );
      dispatch({ type: "removed", id: item.id });
    },
    [state.items],
  );
  const restore = useCallback(
    (item) => dispatch({ type: "restored", item, index: removedAt.current.get(item.id) ?? 0 }),
    [],
  );
  const commit = useCallback((item) => api.remove(item.id), [api]);
  const remove = useUndoableDelete({ hide, restore, commit });

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { items: state.items, status: state.status, error: state.error, add, update, remove, reload };
}
