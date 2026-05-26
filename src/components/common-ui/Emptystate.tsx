type EmptyStateProps = {
  icon?: string
  title: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({ icon = "📭", title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-5xl">{icon}</div>
      <h3 className="mb-2 text-base font-semibold text-slate-700">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-slate-400">{description}</p>
      )}
      {action}
    </div>
  )
}