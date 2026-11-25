import { cn } from "@/lib/cn";

export function Card({ className, ...props }) {
  return <div className={cn("rounded-xl border border-ink/10 bg-white p-5", className)} {...props} />;
}