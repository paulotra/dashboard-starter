import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import ConfirmModal from './ConfirmModal'
import Button from '@/components/ui/Button'

const meta: Meta<typeof ConfirmModal> = {
  title: 'UI/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ConfirmModal>

export const DeleteProduct: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex min-h-96 items-center justify-center">
        <Button variant="danger-filled" onClick={() => setOpen(true)}>
          Delete Product
        </Button>
        <ConfirmModal
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Delete Product?"
          description={
            <>
              This action cannot be undone. The{' '}
              <span className="font-medium text-black">Product #435</span> and all its associated
              data will be permanently deleted.
            </>
          }
          confirmLabel="Delete Product"
        />
      </div>
    )
  },
}

export const PrimaryTone: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex min-h-96 items-center justify-center">
        <Button onClick={() => setOpen(true)}>Publish</Button>
        <ConfirmModal
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          tone="primary"
          title="Publish changes?"
          description="Your changes will go live immediately and be visible to all customers."
          confirmLabel="Publish"
        />
      </div>
    )
  },
}
