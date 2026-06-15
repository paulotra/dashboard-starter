'use client'

import { useId, useState } from 'react'
import { Send } from 'lucide-react'
import { ModalWrapper } from '@/components/ui/modal'
import Button from '@/components/ui/Button'
import FormField from '@/components/form/FormField'
import Input from '@/components/form/Input'

export interface InviteCustomerModalProps {
  open: boolean
  onClose: () => void
  onInvite?: (email: string) => void
}

export default function InviteCustomerModal({ open, onClose, onInvite }: InviteCustomerModalProps) {
  const titleId = useId()
  const emailId = useId()
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onInvite?.(email)
    setEmail('')
    onClose()
  }

  return (
    <ModalWrapper open={open} onClose={onClose} aria-labelledby={titleId}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* ── Header: icon + title + description ── */}
        <div className="flex flex-col gap-2">
          {/* Icon (close button is rendered by ModalWrapper, top-right) */}
          <div className="bg-primary-100 flex size-14 items-center justify-center rounded-lg">
            <Send aria-hidden="true" size={24} className="text-primary-500" />
          </div>

          <div className="flex flex-col gap-2">
            <p id={titleId} className="font-sans text-base font-medium text-black">
              Invite Customer
            </p>
            <p className="font-sans text-sm font-normal leading-5 text-neutral-600">
              Enter the email address. The customer receives an invitation link to set their name,
              address and password.
            </p>
          </div>
        </div>

        {/* ── Email field ── */}
        <FormField label="Email" required htmlFor={emailId}>
          <Input
            id={emailId}
            type="email"
            placeholder="e.g. job@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>

        {/* ── Actions ── */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            type="button"
            className="flex-1 justify-center"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="primary-filled" type="submit" className="flex-1 justify-center">
            Send Invite
          </Button>
        </div>
      </form>
    </ModalWrapper>
  )
}
