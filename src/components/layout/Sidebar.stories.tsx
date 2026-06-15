import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      navigation: { pathname: "/dashboard" },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
  args: {
    companyName: "Company Name",
    user: {
      name: "Paulo Trajano",
      plan: "Starter Plan",
      initials: "PT",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};

export const OrdersActive: Story = {
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: "/orders" } },
  },
};

export const SettingsActive: Story = {
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: "/settings" } },
  },
};
