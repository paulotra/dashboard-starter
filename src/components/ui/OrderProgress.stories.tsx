import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import OrderProgress, { type OrderStatus } from './OrderProgress'

const meta: Meta<typeof OrderProgress> = {
  title: 'UI/OrderProgress',
  component: OrderProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-90">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof OrderProgress>

export const NewOrder: Story = { args: { status: 'New Order' } }
export const Confirmed: Story = { args: { status: 'Confirmed' } }
export const Shipped: Story = { args: { status: 'Shipped' } }
export const Delivered: Story = { args: { status: 'Delivered' } }
export const Cancelled: Story = { args: { status: 'Cancelled' } }

/** Interactive: click a step or the action button to advance the status. */
export const Interactive: Story = {
  render: () => {
    const [status, setStatus] = useState<OrderStatus>('New Order')
    return <OrderProgress status={status} onStatusChange={setStatus} />
  },
}
