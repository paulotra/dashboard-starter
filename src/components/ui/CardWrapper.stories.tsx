import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CardWrapper from './CardWrapper'

const meta: Meta<typeof CardWrapper> = {
  title: 'UI/CardWrapper',
  component: CardWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof CardWrapper>

export const Default: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-1">
        <p className="font-sans text-sm font-medium text-black">Card title</p>
        <p className="font-sans text-sm font-normal text-neutral-600">
          Some supporting content inside the card.
        </p>
      </div>
    ),
  },
}

export const CustomPadding: Story = {
  args: {
    className: 'max-w-sm px-6 py-8',
    children: (
      <div className="flex flex-col gap-1">
        <p className="font-sans text-sm font-medium text-black">Spacious card</p>
        <p className="font-sans text-sm font-normal text-neutral-600">
          Overrides the default <code>p-4</code> with <code>px-6 py-8</code> via{' '}
          <code>className</code>.
        </p>
      </div>
    ),
  },
}
