import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import FormField from './FormField'
import Input from './Input'

const meta: Meta<typeof FormField> = {
  title: 'Form/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  render: () => (
    <FormField label="Product Name">
      <Input id="product-name" placeholder="e.g. Cappuccino" />
    </FormField>
  ),
}

export const Required: Story = {
  render: () => (
    <FormField label="Product Name" required>
      <Input id="product-name-req" placeholder="e.g. Cappuccino" />
    </FormField>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <FormField label="Stock" required helperText="Enter the number of units in stock.">
      <Input id="stock" type="number" placeholder="0" />
    </FormField>
  ),
}

export const WithError: Story = {
  render: () => (
    <FormField label="Price" required error="Price must be greater than 0.">
      <Input id="price" type="number" prefix="€" placeholder="0.00" />
    </FormField>
  ),
}
