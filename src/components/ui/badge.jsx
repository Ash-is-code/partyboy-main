import { cn } from "@/lib/cn";

const TONES = {
	neutral: "bg-ink/5 text-ink/70",
	brand: "bg-brand-100 text-brand-700",
	gold: "bg-gold-100 text-gold-600",
	success: "bg-leaf-50 text-leaf-600",
	warning: "bg-amber-100 text-amber-800",
	danger: "bg-red-100 text-red-800",
};

export function Badge({ tone = "neutral", className, ...props }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
				TONES[tone],
				className,
			)}
			{...props}
		/>
	);
}
