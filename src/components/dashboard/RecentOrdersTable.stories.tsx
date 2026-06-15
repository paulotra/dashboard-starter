import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import RecentOrdersTable, { DEFAULT_ORDERS } from './RecentOrdersTable'

const meta: Meta<typeof RecentOrdersTable> = {
  title: 'Dashboard/RecentOrdersTable',
  component: RecentOrdersTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof RecentOrdersTable>

export const Default: Story = {}

export const CustomTitle: Story = {
  args: {
    title: 'Latest Transactions',
    subtitle: 'Showing the 8 most recent orders',
  },
}

export const FewOrders: Story = {
  args: {
    orders: DEFAULT_ORDERS.slice(0, 3),
  },
}

export const SingleOrder: Story = {
  args: {
    orders: [DEFAULT_ORDERS[0]],
  },
}

export const AllStatuses: Story = {
  args: {
    orders: [
      DEFAULT_ORDERS[0], // Pending
      DEFAULT_ORDERS[1], // Completed
      DEFAULT_ORDERS[2], // Processing
      DEFAULT_ORDERS[5], // Cancelled
    ],
    subtitle: 'One of each status variant',
  },
}
