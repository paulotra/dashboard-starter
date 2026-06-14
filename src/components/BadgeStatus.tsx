const STATUS_CONFIG = {
  Pending: {
    bg: 'bg-yellow-100',
    dot: 'bg-yellow-600',
    text: 'text-yellow-600',
  },
  Completed: {
    bg: 'bg-green-100',
    dot: 'bg-green-500',
    text: 'text-green-500',
  },
  Processing: {
    bg: 'bg-primary-200',
    dot: 'bg-primary-500',
    text: 'text-primary-500',
  },
  Cancelled: {
    bg: 'bg-red-100',
    dot: 'bg-red-500',
    text: 'text-red-500',
  },
} as const

type Status = keyof typeof STATUS_CONFIG

export interface BadgeStatusProps {
  status?: Status
}

export default function BadgeStatus({ status = 'Pending' }: BadgeStatusProps) {
  const { bg, dot, text } = STATUS_CONFIG[status]
  return (
    <div className={`inline-flex items-center gap-1 rounded px-2 py-1 ${bg}`}>
      <span className={`size-1.5 shrink-0 rounded-full ${dot}`} />
      <span className={`text-2xs font-sans font-medium whitespace-nowrap ${text}`}>{status}</span>
    </div>
  )
}
