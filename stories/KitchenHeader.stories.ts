import type { Meta, StoryObj } from "@storybook/react";

import KitchenHeader from "../components/kitchen/header/KitchenHeader";

const meta: Meta<typeof KitchenHeader> = {
  title: "TinyBento/Header/KitchenHeader",
  component: KitchenHeader,
};
export default meta;
type Story = StoryObj<typeof KitchenHeader>;

export const Default: Story = {
  args: {},
};
