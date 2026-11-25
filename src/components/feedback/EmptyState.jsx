export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="rounded-xl border border-dashed border-ink/20 bg-white px-6 py-14 text-center">
      {Icon && <Icon className="mx-auto mb-3 text-brand-600" size={32} />}
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {description && <p className="mx-auto mt-1 max-w-sm text-sm text-ink/60">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
