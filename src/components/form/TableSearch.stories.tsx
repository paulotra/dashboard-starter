import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import TableSearch from './TableSearch'

const meta: Meta<typeof TableSearch> = {
  title: 'Form/TableSearch',
  component: TableSearch,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof TableSearch>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <TableSearch
        value={value}
        onChange={setValue}
        placeholder="Search order…"
        label="Search orders"
      />
    )
  },
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('Bakkerij')
    return (
      <TableSearch
        value={value}
        onChange={setValue}
        placeholder="Search order…"
        label="Search orders"
      />
    )
  },
}
