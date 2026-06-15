import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

function PaginationDemo({ totalPages, initial = 1 }: { totalPages: number; initial?: number }) {
  const [page, setPage] = useState(initial)
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-neutral-600">
        Page {page} of {totalPages}
      </p>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}

export const FewPages: Story = {
  render: () => <PaginationDemo totalPages={5} />,
}

export const ManyPages: Story = {
  render: () => <PaginationDemo totalPages={15} initial={1} />,
}

export const MidPage: Story = {
  render: () => <PaginationDemo totalPages={15} initial={7} />,
}

export const NearEnd: Story = {
  render: () => <PaginationDemo totalPages={15} initial={14} />,
}

export const SinglePage: Story = {
  render: () => <PaginationDemo totalPages={1} />,
}

export const TwoPages: Story = {
  render: () => <PaginationDemo totalPages={2} />,
}
