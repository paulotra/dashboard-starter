'use client'

import { useRef, useState, useId } from 'react'
import { ImageUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ImageDropzoneProps {
  /** Called when the user selects a file. */
  onFileSelect?: (file: File) => void
  /** Main label text inside the dropzone. */
  label?: string
  /** Hint text below the label (file type / size constraints). */
  hint?: string
  className?: string
}

export default function ImageDropzone({
  onFileSelect,
  label = 'Upload image',
  hint = 'PNG, JPG up to 5MB',
  className,
}: ImageDropzoneProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedName(file.name)
    onFileSelect?.(file)
  }

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-2',
        'rounded-lg border border-dashed border-neutral-400 p-6',
        'hover:bg-neutral-200 focus-within:outline-2 focus-within:outline-primary-500',
        'transition-colors',
        className
      )}
    >
      {/* Hidden file input — the whole label is clickable */}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
      />

      {/* Icon container */}
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary-100">
        <ImageUp aria-hidden="true" size={20} className="text-primary-500" />
      </span>

      {/* Labels */}
      <span className="font-sans text-sm font-medium text-black">
        {selectedName ?? label}
      </span>
      {!selectedName && (
        <span className="font-sans text-xs text-neutral-600">{hint}</span>
      )}
    </label>
  )
}
