'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { DrawerWrapper, DrawerHeader, DrawerBody, DrawerFooter } from './index'

const meta = {
  title: 'UI/Drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex h-screen items-center justify-center bg-neutral-200">
        <Button variant="primary-filled" icon={Plus} onClick={() => setOpen(true)}>
          Open Drawer
        </Button>

        <DrawerWrapper open={open} onClose={() => setOpen(false)}>
          <DrawerHeader title="Sample Drawer" />
          <DrawerBody>
            <div className="flex flex-col gap-4">
              <p className="font-sans text-sm text-neutral-600">
                This is the drawer body. It scrolls when content overflows. Use it to place
                form fields, details panels, or any other content.
              </p>
              <p className="font-sans text-sm text-neutral-600">
                Press <strong>Esc</strong>, click the backdrop, or use the close button in
                the header to close the drawer. Focus is trapped inside while it is open.
              </p>
              <div className="flex flex-col gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-neutral-400 bg-neutral-100 p-3 font-sans text-sm text-black"
                  >
                    Sample content row {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary-filled" type="button" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </DrawerFooter>
        </DrawerWrapper>
      </div>
    )
  },
}
