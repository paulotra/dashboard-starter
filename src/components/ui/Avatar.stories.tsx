import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    initials: 'AB',
  },
}

export const TwoChars: Story = {
  args: {
    initials: 'MV',
  },
}

export const SingleChar: Story = {
  args: {
    initials: 'X',
  },
}
