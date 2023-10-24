import type { Meta, StoryObj } from "@storybook/react";

import ActionContainer from "@/components/kitchen/action/ActionContainer";

const meta = {
  title: "TinyBento/Action/ActionContainer",
  component: ActionContainer,
} satisfies Meta<typeof ActionContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
