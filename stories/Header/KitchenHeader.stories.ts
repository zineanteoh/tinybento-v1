import type { Meta, StoryObj } from "@storybook/react";

import KitchenHeader from "@/components/kitchen/header/KitchenHeader";

const meta = {
  title: "TinyBento/Header/KitchenHeader",
  component: KitchenHeader,
} satisfies Meta<typeof KitchenHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
