import { cn } from "@/lib/cn";

const VARIANTS = {
  primary: "bg-brand-700 text-white hover:bg-brand-800",
  secondary: "border border-ink/20 bg-white text-ink hover:bg-brand-50",
  ghost: "text-ink hover:bg-ink/5",
  danger: "bg-red-700 text-white hover:bg-red-800",
};
const SIZES = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm" };

export function Button({ variant = "primary", size = "md", type = "button", className, ...props }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}


export default Button