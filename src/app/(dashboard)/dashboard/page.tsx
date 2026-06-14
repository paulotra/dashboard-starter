export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">Welcome to your dashboard.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-surface p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Metric {i + 1}
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
