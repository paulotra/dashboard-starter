import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Navigation from "./Navigation";
import { PageActionsProvider } from "./PageActionsContext";

const meta: Meta<typeof Navigation> = {
  title: "Layout/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true, navigation: { pathname: "/dashboard" } },
  },
  decorators: [
    (Story) => (
      <PageActionsProvider>
        <Story />
      </PageActionsProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Dashboard: Story = {};

export const Orders: Story = {
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: "/orders" } },
  },
};

export const Settings: Story = {
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: "/settings" } },
  },
};
