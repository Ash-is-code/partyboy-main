import { cn } from "@/lib/cn";

export function Table({headers, children}) {
    return(
        <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white">
            <table className="w-full text-left text-sm">
                <thead className="bg-brand-50">
                    <tr>{headers.map((h, i) => (
                        <th key={i} 
                            className="px-4 py-3 text-xs font-semibold text-ink/60">
                            {h}
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">{children}</tbody>
            </table>
        </div>
    )
}
export function Td({ className, ...props}){
    return <td className={cn("px04 py-3 align-middle", className)} {...props} /> 
}