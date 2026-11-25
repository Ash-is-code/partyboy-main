import { useState } from "react";

const NEW = Symbol("new");

// Tracks one modal that can either create a new item or edit an existing one.
export function useFormModal() {
  const [target, setTarget] = useState(null);
  return {
    isOpen: target !== null,
    isNew: target === NEW,
    item: target === NEW ? null : target,
    openNew: () => setTarget(NEW),
    openEdit: (item) => setTarget(item),
    close: () => setTarget(null),
  };
}
