import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const VARIANT_CONFIG = {
  secondary: {
    container: 'bg-btn-secondary-bg border border-neutral-400',
    text: 'text-black',
  },
  primary: {
    container: 'bg-btn-primary-bg',
    text: 'text-primary-500',
  },
  'primary-filled': {
    container: 'bg-btn-primary-bg-filled',
    text: 'text-white',
  },
  danger: {
    container: 'bg-red-100 hover:bg-red-200',
    text: 'text-red-500',
  },
  'danger-filled': {
    container: 'bg-red-500 hover:bg-red-600',
    text: 'text-white',
  },
} as const

export type ButtonVariant = keyof typeof VARIANT_CONFIG

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: LucideIcon
  /** Extra classes for the leading icon (e.g. to color it independently of the label). */
  iconClassName?: string
  children: ReactNode
}

export default function Button({
  variant = 'secondary',
  icon: Icon,
  iconClassName,
  children,
  className,
  ...props
}: ButtonProps) {
  const { container, text } = VARIANT_CONFIG[variant]
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-3',
        container,
        text,
        className
      )}
      {...props}
    >
      {Icon && <Icon size={14} className={cn('shrink-0', iconClassName)} />}
      <span className="font-sans text-sm font-normal whitespace-nowrap">{children}</span>
    </button>
  )
}
