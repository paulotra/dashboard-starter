import { useId } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TableSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** Accessible label for the input (visually hidden). */
  label?: string
  className?: string
}

export default function TableSearch({
  value,
  onChange,
  placeholder = 'Search…',
  label = 'Search',
  className,
}: TableSearchProps) {
  const inputId = useId()

  return (
    <div className={cn('relative flex items-center', className)}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden="true"
        size={14}
        className="pointer-events-none absolute left-2.5 shrink-0 text-neutral-600"
      />
      <input
        id={inputId}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'h-9 rounded-lg border border-neutral-400 bg-white pl-8',
          value ? 'pr-9' : 'pr-3',
          'font-sans text-sm font-normal text-black',
          'placeholder:text-neutral-500',
          'focus:outline-primary-500 focus:outline-2'
        )}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="focus-visible:outline-primary-500 absolute right-2.5 flex shrink-0 items-center justify-center text-neutral-600 hover:text-black focus-visible:outline-2"
        >
          <X aria-hidden="true" size={14} />
        </button>
      )}
    </div>
  )
}
