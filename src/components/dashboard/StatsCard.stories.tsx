import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import StatsCard from "./StatsCard";

const meta: Meta<typeof StatsCard> = {
  title: "Dashboard/StatsCard",
  component: StatsCard,
  tags: ["autodocs"],
  args: {
    title: "Orders today",
    value: 12,
    delta: "+3",
    subtitle: "vs. yesterday",
  },
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {};

export const NoDelta: Story = {
  args: {
    title: "Total revenue",
    value: "$4,320",
    delta: undefined,
    subtitle: "This month",
  },
};

export const NegativeDelta: Story = {
  args: {
    title: "Active users",
    value: 284,
    delta: "-12",
    subtitle: "vs. last week",
  },
};

export const ValueOnly: Story = {
  args: {
    title: "Pending orders",
    value: 7,
    delta: undefined,
    subtitle: undefined,
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <StatsCard title="Orders today" value={12} delta="+3" subtitle="vs. yesterday" />
      <StatsCard title="Total revenue" value="$4,320" delta="+8%" subtitle="vs. last month" />
      <StatsCard title="Active users" value={284} delta="-12" subtitle="vs. last week" />
      <StatsCard title="Pending orders" value={7} />
    </div>
  ),
};
