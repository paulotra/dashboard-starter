import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import TopCustomers, { DEFAULT_CUSTOMERS } from './TopCustomers'

const meta: Meta<typeof TopCustomers> = {
  title: 'Dashboard/TopCustomers',
  component: TopCustomers,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof TopCustomers>

export const Default: Story = {}

export const FewCustomers: Story = {
  args: {
    customers: DEFAULT_CUSTOMERS.slice(0, 3),
  },
}

export const SingleCustomer: Story = {
  args: {
    customers: [DEFAULT_CUSTOMERS[10]], // VV / Vuur & Vlam — 1 machine, 1 order (singular test)
  },
}

export const CustomTitle: Story = {
  args: {
    title: 'Best Buyers',
  },
}
