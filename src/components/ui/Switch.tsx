'use client'

import { useState } from 'react'

type SwitchSize = 'default' | 'large'

export interface SwitchProps {
  size?: SwitchSize
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  'aria-label'?: string
}

export default function Switch({
  size = 'default',
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  'aria-label': ariaLabel,
}: SwitchProps) {
  const [internal, setInternal] = useState(defaultChecked)
  const isOn = checked !== undefined ? checked : internal
  const isLarge = size === 'large'

  const toggle = () => {
    if (disabled) return
    const next = !isOn
    setInternal(next)
    onChange?.(next)
  }

  return (
    <button
      role="switch"
      type="button"
      aria-checked={isOn}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={toggle}
      className={[
        'relative shrink-0 rounded-full transition-colors duration-200',
        'focus-visible:outline-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2',
        isLarge ? 'h-6 w-12' : 'h-5 w-10',
        isOn ? 'bg-primary-500' : 'bg-neutral-300',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-0.5 left-0.5 rounded-full bg-white shadow-sm',
          'transition-transform duration-200 ease-in-out',
          isLarge ? 'size-5' : 'size-4',
          isOn ? (isLarge ? 'translate-x-6' : 'translate-x-5') : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  )
}
