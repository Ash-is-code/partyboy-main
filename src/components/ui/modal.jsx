import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { IconButton } from "./iconbutton";

export function Modal({ open, onClose, title, children}){
    const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60"
    >
      {open && (
        <div className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">{title}</h2>
            <IconButton label="Close" onClick={onClose}>
              <X size={18} />
            </IconButton>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}