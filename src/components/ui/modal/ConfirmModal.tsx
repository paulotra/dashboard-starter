'use client'

import { useId, type ReactNode } from 'react'
import { TriangleAlert, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import ModalWrapper from './ModalWrapper'

export interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  /** Visual tone of the icon + confirm button. Defaults to 'danger'. */
  tone?: 'danger' | 'primary'
  /** Override the icon shown in the circle. Defaults to a warning triangle. */
  icon?: LucideIcon
}

const TONE_CONFIG = {
  danger: {
    iconWrap: 'bg-red-100',
    icon: 'text-red-500',
    confirmVariant: 'danger-filled',
  },
  primary: {
    iconWrap: 'bg-primary-100',
    icon: 'text-primary-500',
    confirmVariant: 'primary-filled',
  },
} as const

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  icon: Icon = TriangleAlert,
}: ConfirmModalProps) {
  const titleId = useId()
  const { iconWrap, icon, confirmVariant } = TONE_CONFIG[tone]

  return (
    <ModalWrapper open={open} onClose={onClose} showCloseButton={false} aria-labelledby={titleId}>
      <div className="flex flex-col items-center gap-6">
        <div className={cn('flex size-14 items-center justify-center rounded-full', iconWrap)}>
          <Icon aria-hidden="true" size={28} className={icon} />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <p id={titleId} className="font-sans text-base font-medium text-black">
            {title}
          </p>
          {description && (
            <p className="font-sans text-sm font-normal leading-relaxed text-neutral-600">
              {description}
            </p>
          )}
        </div>

        <div className="flex w-full gap-3">
          <Button
            variant="secondary"
            type="button"
            className="flex-1 justify-center"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            type="button"
            className="flex-1 justify-center"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
