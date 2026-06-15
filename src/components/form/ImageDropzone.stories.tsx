import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ImageDropzone from './ImageDropzone'

const meta: Meta<typeof ImageDropzone> = {
  title: 'Form/ImageDropzone',
  component: ImageDropzone,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof ImageDropzone>

export const Default: Story = {
  args: {
    label: 'Upload image',
    hint: 'PNG, JPG up to 5MB',
  },
}

export const CustomLabels: Story = {
  args: {
    label: 'Upload thumbnail',
    hint: 'SVG, PNG, JPG, GIF up to 10MB',
  },
}
