import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'e.g. Cappuccino',
  },
}

export const WithValue: Story = {
  args: {
    value: 'Espresso',
    onChange: () => {},
    placeholder: 'e.g. Cappuccino',
  },
}

export const WithPrefix: Story = {
  args: {
    prefix: '€',
    type: 'number',
    placeholder: '0.00',
  },
}

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
}
