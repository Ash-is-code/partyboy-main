import {cn} from "@/lib/cn"

const TONE = { info: "bg-ink text-white", error: "bg-red-800 text-white" };
export function ToastViewport({ toasts, onDismiss}) {
    return(
        <div className="fixed bottom-4 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
            {toasts.map((t) =>(
                <div
                    key={t.id}
                    className={cn(
                        "flex items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm shadow-lg",
                        TONE[t.tone],  
                    )}>
                    <span>{t.message}</span>
                    {t.action && (
                        <button
                            type="button"
                            className="font-bold text-gold-400 underline underline-offset-2"
                            onClick={() =>{
                                t.action.onClick();
                                onDismiss(t.id);
                            }}>
                            {t.action.label}
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

