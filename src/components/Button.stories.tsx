import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button, { ExportIcon, TrashIcon, PlusIcon } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Label",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: <ExportIcon />,
    children: "Export",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: <PlusIcon />,
    children: "Create Order",
  },
};

export const PrimaryFilled: Story = {
  args: {
    variant: "primary-filled",
    icon: <PlusIcon />,
    children: "Create Order",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    icon: <TrashIcon />,
    children: "Cancel Order",
  },
};

export const DangerFilled: Story = {
  args: {
    variant: "danger-filled",
    icon: <TrashIcon />,
    children: "Cancel Order",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" icon={<ExportIcon />}>Export</Button>
      <Button variant="primary" icon={<PlusIcon />}>Create Order</Button>
      <Button variant="primary-filled" icon={<PlusIcon />}>Create Order</Button>
      <Button variant="danger" icon={<TrashIcon />}>Cancel Order</Button>
      <Button variant="danger-filled" icon={<TrashIcon />}>Cancel Order</Button>
    </div>
  ),
};
