import type { Meta, StoryObj } from "@storybook/react";

import EditAndPresent, {
  KitchenMode,
} from "@/components/kitchen/header/EditAndPresent";

const meta = {
  title: "TinyBento/Header/EditAndPresent",
  component: EditAndPresent,
} satisfies Meta<typeof EditAndPresent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditMode: Story = {
  args: {
    defaultMode: KitchenMode.Edit,
  },
};

export const PresentMode: Story = {
  args: {
    defaultMode: KitchenMode.Present,
  },
};
