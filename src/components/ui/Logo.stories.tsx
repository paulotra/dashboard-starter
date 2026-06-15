import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Logo from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "UI/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: {
    companyName: "Company Name",
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const CustomName: Story = {
  args: {
    companyName: "Acme Corp",
  },
};
