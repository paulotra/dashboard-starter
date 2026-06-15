import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import ModalWrapper from './ModalWrapper'
import Button from '@/components/ui/Button'

const meta: Meta<typeof ModalWrapper> = {
  title: 'UI/ModalWrapper',
  component: ModalWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ModalWrapper>

/**
 * The wrapper only provides the centered white container, backdrop, and close
 * button — all content is custom. This story passes a delete-confirmation body.
 */
export const ConfirmDelete: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex min-h-96 items-center justify-center">
        <Button variant="danger-filled" onClick={() => setOpen(true)}>
          Delete Product
        </Button>

        <ModalWrapper open={open} onClose={() => setOpen(false)} aria-label="Delete product">
          <div className="flex flex-col items-center gap-6">
            <div className="flex size-14 items-center justify-center rounded-full bg-red-100">
              <TriangleAlert aria-hidden="true" size={28} className="text-red-500" />
            </div>

            <div className="flex flex-col gap-2 text-center">
              <p className="font-sans text-base font-medium text-black">Delete Product?</p>
              <p className="font-sans text-sm font-normal leading-relaxed text-neutral-600">
                This action cannot be undone. The{' '}
                <span className="font-medium text-black">Product #435</span> and all its associated
                data will be permanently deleted.
              </p>
            </div>

            <div className="flex w-full gap-3">
              <Button variant="secondary" className="flex-1 justify-center" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger-filled" className="flex-1 justify-center" onClick={() => setOpen(false)}>
                Delete Product
              </Button>
            </div>
          </div>
        </ModalWrapper>
      </div>
    )
  },
}

/** Without the close button (e.g. forced-choice confirmation dialogs). */
export const NoCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex min-h-96 items-center justify-center">
        <Button onClick={() => setOpen(true)}>Open</Button>
        <ModalWrapper
          open={open}
          onClose={() => setOpen(false)}
          showCloseButton={false}
          aria-label="Example"
        >
          <div className="flex flex-col gap-4">
            <p className="font-sans text-base font-medium text-black">No close button</p>
            <p className="font-sans text-sm text-neutral-600">
              The ✕ is hidden — dismiss via the actions, Esc, or backdrop click.
            </p>
            <Button variant="primary-filled" className="justify-center" onClick={() => setOpen(false)}>
              Got it
            </Button>
          </div>
        </ModalWrapper>
      </div>
    )
  },
}
