import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import Switch from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    size: "default",
    defaultChecked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const DefaultOn: Story = {
  args: { defaultChecked: true },
};

export const Large: Story = {
  args: { size: "large" },
};

export const LargeOn: Story = {
  args: { size: "large", defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledOn: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Switch size="default" />
        <Switch size="default" defaultChecked />
        <Switch size="large" />
        <Switch size="large" defaultChecked />
      </div>
      <div className="flex items-center gap-4">
        <Switch size="default" disabled />
        <Switch size="default" disabled defaultChecked />
        <Switch size="large" disabled />
        <Switch size="large" disabled defaultChecked />
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div className="flex items-center gap-3">
        <Switch checked={on} onChange={setOn} aria-label="Toggle feature" />
        <span className="font-sans text-sm text-neutral-700">
          {on ? "Enabled" : "Disabled"}
        </span>
      </div>
    );
  },
};
