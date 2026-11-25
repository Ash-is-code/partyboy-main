import { Loader2 } from "lucide-react";

export function Spinner() {
  return (
    <div role="status" className="flex justify-center py-16 text-brand-700">
      <Loader2 className="animate-spin" size={28} />
      <span className="sr-only">Loading</span>
    </div>
  );
}
