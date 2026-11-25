import { cn } from "@/lib/cn";
import { Card } from "./card";

const VALUE_TONES = { default: "text-ink", danger: "text-red-700", success: "text-leaf-600"}

export function StatCard({label, value, hint, tone = "default"}){
    return(
        <Card>
            <p className="text-sm text-ink/60">{label}</p>
            <p className={cn("mt-1 font-display text-2xl font-bold", VALUE_TONES[tone])}>{value}</p>
            {hint && <p className="mt-1 text-xs text-ink/60">{hint}</p>}
        </Card>
    )
};