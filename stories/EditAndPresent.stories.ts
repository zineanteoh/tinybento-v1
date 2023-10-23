import type { Meta, StoryObj } from "@storybook/react";

import EditAndPresent, {
  KitchenMode,
} from "../components/kitchen/header/EditAndPresent";

const meta: Meta<typeof EditAndPresent> = {
  component: EditAndPresent,
};
export default meta;
type Story = StoryObj<typeof EditAndPresent>;

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
