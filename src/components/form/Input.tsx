import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Omit the native HTML `prefix` attribute (a string | undefined relating to XML namespaces)
// so we can re-declare it as ReactNode for our currency-symbol use case.
export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'prefix'> {
  /**
   * Optional prefix rendered inside the bordered box on the left side.
   * Useful for currency symbols (e.g. "€") or units.
   */
  prefix?: ReactNode
}

export default function Input({ prefix, className, id, ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      {prefix && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 select-none font-sans text-sm text-neutral-600"
        >
          {prefix}
        </span>
      )}
      <input
        id={id}
        className={cn(
          'h-11 w-full rounded-lg border border-neutral-400 bg-white font-sans text-sm text-black',
          'placeholder:text-neutral-600',
          'focus:outline-2 focus:outline-primary-500',
          prefix ? 'pl-8 pr-4' : 'px-4',
          className
        )}
        {...props}
      />
    </div>
  )
}
