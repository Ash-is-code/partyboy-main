import { cn } from "@/lib/cn"

export function IconButton({ label, className, children, ...props }) {
  return (
    <button
      type="button"
      title={label}
      className={cn("rounded-lg p-2 text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink", className)}
      {...props}
    >
      {children}
    </button>
  );
}