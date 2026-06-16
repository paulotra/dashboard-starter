import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import BadgeStatus from './BadgeStatus'

const meta: Meta<typeof BadgeStatus> = {
  title: 'UI/BadgeStatus',
  component: BadgeStatus,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BadgeStatus>

/* ─── Semantic variant stories (preferred API) ─────────────────────── */

export const Success: Story = { args: { variant: 'success', children: 'Activated' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Deactivated' } }
export const Info: Story = { args: { variant: 'info', children: 'Invite Sent' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Expired' } }
export const Neutral: Story = { args: { variant: 'neutral', children: 'Unknown' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Confirmed' } }
export const Mint: Story = { args: { variant: 'mint', children: 'Shipped' } }

/* ─── Legacy status prop (backward-compat — orders use cases) ──────── */

export const NewOrder: Story = { args: { status: 'New Order' } }
export const ConfirmedStatus: Story = { args: { status: 'Confirmed' } }
export const ShippedStatus: Story = { args: { status: 'Shipped' } }
export const Delivered: Story = { args: { status: 'Delivered' } }
export const Cancelled: Story = { args: { status: 'Cancelled' } }

/* ─── All variants at a glance ─────────────────────────────────────── */

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <BadgeStatus variant="success">Activated</BadgeStatus>
      <BadgeStatus variant="danger">Deactivated</BadgeStatus>
      <BadgeStatus variant="info">Invite Sent</BadgeStatus>
      <BadgeStatus variant="warning">Expired</BadgeStatus>
      <BadgeStatus variant="neutral">Unknown</BadgeStatus>
      <BadgeStatus variant="secondary">Confirmed</BadgeStatus>
      <BadgeStatus variant="mint">Shipped</BadgeStatus>
    </div>
  ),
}

export const OrderStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <BadgeStatus status="New Order" />
      <BadgeStatus status="Confirmed" />
      <BadgeStatus status="Shipped" />
      <BadgeStatus status="Delivered" />
      <BadgeStatus status="Cancelled" />
    </div>
  ),
}
