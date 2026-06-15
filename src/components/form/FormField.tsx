import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  label: string
  /** When true, renders a red asterisk after the label. */
  required?: boolean
  /** Override the generated id — the label's htmlFor and children's id should match. */
  htmlFor?: string
  /** Helper text displayed below the control in muted style. */
  helperText?: string
  /** Error message displayed below the control. When present, helperText is hidden. */
  error?: string
  children: ReactNode
  className?: string
}

/**
 * FormField wraps a labeled control.
 *
 * Usage — the simplest pattern is to let FormField auto-generate the id and
 * pass it to the child via `htmlFor` or the `id` forwarding from Input/Select:
 *
 *   <FormField label="Product Name" required>
 *     <Input id={???} placeholder="e.g. Cappuccino" />
 *   </FormField>
 *
 * Because React doesn't support render-props in JSX children inline without
 * ceremony, the cleanest ergonomic API for this project is: FormField renders
 * a `<label>` pointing at its generated id, and the caller passes a matching
 * `id` prop to their input. To avoid this boilerplate, FormField also accepts
 * `htmlFor` to override the generated id when the caller manages their own id.
 *
 * The generated id is exported via the `data-field-id` attribute on the root
 * element so a custom child can read it if needed (edge case).
 */
export default function FormField({
  label,
  required,
  htmlFor,
  helperText,
  error,
  children,
  className,
}: FormFieldProps) {
  const generatedId = useId()
  const id = htmlFor ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1.5', className)} data-field-id={id}>
      <label htmlFor={id} className="font-sans text-sm font-medium text-black">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-red-500">
            *
          </span>
        )}
      </label>

      {children}

      {error ? (
        <p role="alert" className="font-sans text-xs text-red-500">
          {error}
        </p>
      ) : helperText ? (
        <p className="font-sans text-xs text-neutral-600">{helperText}</p>
      ) : null}
    </div>
  )
}
