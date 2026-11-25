import { forwardRef } from "react";
import { cn } from "@/lib/cn"
import { fieldClass } from "./input";

export const Select = forwardRef(function Select({label, error, options, className, id, ...props}, ref){
    const autoId = useId();
    const selectId = id ?? autoId;
    
    return(
        <div className="space-y-1">
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium">{label}</label>
            )}
            <select ref={ref} id={selectId} className={cn(fieldClass, error && "border-red-700", className)}{...props}>
                {
                    options.map((o) => {
                        const {value, label:text} = typeof o === "string" ? {value: o, label: o} : o;
                        return(
                            <option value={value} key={value}>
                                {text}
                            </option>
                        )
                    })
                }
            </select>
            {error && <p className="text-xs text-red-700">{error}</p>}
        </div>
    )
});
