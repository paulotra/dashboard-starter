interface TopBarProps {
  title?: string
}

export default function TopBar({ title = 'Overview' }: TopBarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center border-b border-border bg-surface px-6">
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>
    </header>
  )
}
