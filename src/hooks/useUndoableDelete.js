import { useCallback } from "react";
import { useToast } from "./useToast";

const UNDO_WINDOW_MS = 5000;

/**
 * Delete with an undo window instead of a confirm dialog.
 *  hide(item)    -> remove from the UI right away
 *  restore(item) -> put it back (undo, or the server call failed)
 *  commit(item)  -> the real delete, fired after the window closes
 */
export function useUndoableDelete({ hide, restore, commit }) {
  const { toast } = useToast();

  return useCallback(
    (item, label = "Item") => {
      hide(item);
      let undone = false;

      const timer = setTimeout(async () => {
        if (undone) return;
        try {
          await commit(item);
        } catch {
          restore(item);
          toast({ message: `Couldn't delete ${label}. It's back in the list.`, tone: "error" });
        }
      }, UNDO_WINDOW_MS);

      toast({
        message: `${label} deleted`,
        duration: UNDO_WINDOW_MS,
        action: {
          label: "Undo",
          onClick: () => {
            undone = true;
            clearTimeout(timer);
            restore(item);
          },
        },
      });
    },
    [hide, restore, commit, toast],
  );
}
