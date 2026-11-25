export function PageHeader({ title, description, actions}){
    return(
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="font-display text-3xl font-bold">{title}</h1>
                {description && <p className="mt-1 text-ink/60">{description}</p>}
            </div>
            {actions}
        </div>
    )
}