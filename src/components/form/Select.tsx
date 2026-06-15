import type { ComponentPropsWithoutRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  /**
   * Options to render. If you prefer, you can omit this and pass `<option>`
   * elements as `children` instead.
   */
  options?: SelectOption[]
  /**
   * Placeholder text shown as the first, disabled, selected-by-default option.
   */
  placeholder?: string
}

/**
 * A styled native `<select>`. Native select is the accessible, low-risk choice
 * — it leverages the platform's built-in keyboard navigation and screen-reader
 * announcements without a custom listbox implementation.
 */
export default function Select({
  options,
  placeholder,
  children,
  className,
  id,
  ...props
}: SelectProps) {
  // A controlled select (caller passes `value`) must not also receive
  // `defaultValue`. Only seed the placeholder default when uncontrolled.
  const isControlled = props.value !== undefined

  return (
    <div className="relative flex items-center">
      <select
        id={id}
        className={cn(
          'h-11 w-full appearance-none rounded-lg border border-neutral-400 bg-white px-4 font-sans text-sm text-black',
          'focus:outline-2 focus:outline-primary-500',
          // When nothing is selected (placeholder), text looks muted
          'invalid:text-neutral-600',
          className
        )}
        defaultValue={!isControlled && placeholder ? '' : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>

      {/* Chevron icon — decorative, the native select handles interaction */}
      <ChevronDown
        aria-hidden="true"
        size={14}
        className="pointer-events-none absolute right-3 shrink-0 text-neutral-600"
      />
    </div>
  )
}
