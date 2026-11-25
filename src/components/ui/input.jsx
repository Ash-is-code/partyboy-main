import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

export const fieldClass =
  "w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-brand-600";

  export const Input = forwardRef(function Input({ label, error, hint, className, id, ...props }, ref) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(fieldClass, error && "border-red-600", className)}
        {...props}
      />
      {hint && !error && <p className="text-xs text-ink/60">{hint}</p>}
      {error && <p className="text-xs text-red-700">{error}</p>}
    </div>
  );
});