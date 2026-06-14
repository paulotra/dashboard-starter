import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Breadcrumb from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const TwoLevels: Story = {
  args: {
    items: [{ label: "Overview" }, { label: "Dashboard" }],
  },
};

export const WithLinks: Story = {
  args: {
    items: [
      { label: "Overview", href: "/dashboard" },
      { label: "Orders", href: "/orders" },
      { label: "Order #1042" },
    ],
  },
};

export const ThreeLevels: Story = {
  args: {
    items: [
      { label: "Manage", href: "/orders" },
      { label: "Products", href: "/products" },
      { label: "Edit Product" },
    ],
  },
};
