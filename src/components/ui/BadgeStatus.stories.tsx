import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BadgeStatus from "./BadgeStatus";

const meta: Meta<typeof BadgeStatus> = {
  title: "UI/BadgeStatus",
  component: BadgeStatus,
  tags: ["autodocs"],
  args: {
    status: "Pending",
  },
};

export default meta;
type Story = StoryObj<typeof BadgeStatus>;

export const Pending: Story = { args: { status: "Pending" } };
export const Completed: Story = { args: { status: "Completed" } };
export const Processing: Story = { args: { status: "Processing" } };
export const Cancelled: Story = { args: { status: "Cancelled" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <BadgeStatus status="Pending" />
      <BadgeStatus status="Completed" />
      <BadgeStatus status="Processing" />
      <BadgeStatus status="Cancelled" />
    </div>
  ),
};
