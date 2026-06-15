import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import FilterChip from './FilterChip'

const meta: Meta<typeof FilterChip> = {
  title: 'UI/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Pending',
  },
}

export default meta
type Story = StoryObj<typeof FilterChip>

export const Inactive: Story = {
  args: {
    active: false,
  },
}

export const Active: Story = {
  args: {
    active: true,
  },
}

export const Group: Story = {
  render: () => (
    <div className="flex items-center gap-1.5" role="group" aria-label="Filter by status">
      <FilterChip active>Pending</FilterChip>
      <FilterChip active>Processing</FilterChip>
      <FilterChip>Cancelled</FilterChip>
      <FilterChip active>Completed</FilterChip>
    </div>
  ),
}
