import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Select from './Select'

const CATEGORY_OPTIONS = [
  { label: 'Coffee', value: 'coffee' },
  { label: 'Tea', value: 'tea' },
  { label: 'Soup', value: 'soup' },
]

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    options: CATEGORY_OPTIONS,
    placeholder: 'Select a category',
  },
}

export const WithValue: Story = {
  args: {
    options: CATEGORY_OPTIONS,
    placeholder: 'Select a category',
    defaultValue: 'coffee',
  },
}
