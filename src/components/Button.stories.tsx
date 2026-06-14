import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Download, Trash, Plus } from 'lucide-react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Label',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    icon: Download,
    children: 'Export',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    icon: Plus,
    children: 'Create Order',
  },
}

export const PrimaryFilled: Story = {
  args: {
    variant: 'primary-filled',
    icon: Plus,
    children: 'Create Order',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    icon: Trash,
    children: 'Cancel Order',
  },
}

export const DangerFilled: Story = {
  args: {
    variant: 'danger-filled',
    icon: Trash,
    children: 'Cancel Order',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" icon={Download}>
        Export
      </Button>
      <Button variant="primary" icon={Plus}>
        Create Order
      </Button>
      <Button variant="primary-filled" icon={Plus}>
        Create Order
      </Button>
      <Button variant="danger" icon={Trash}>
        Cancel Order
      </Button>
      <Button variant="danger-filled" icon={Trash}>
        Cancel Order
      </Button>
    </div>
  ),
}
