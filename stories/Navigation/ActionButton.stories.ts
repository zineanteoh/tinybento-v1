import type { Meta, StoryObj } from "@storybook/react";

import ActionButton from "@/components/kitchen/ActionButton";
import {
  IconChangeTheme,
  IconEdit,
  IconHierarchy,
  IconPlus,
  IconShare,
} from "@/utils/iconLibrary";

const meta = {
  title: "TinyBento/Navigation/ActionButton",
  component: ActionButton,
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddIngredient: Story = {
  args: {
    actionName: "Add Ingredient",
    color: "#FFCBA6",
    icon: IconPlus,
  },
};

export const EditContent: Story = {
  args: {
    actionName: "Edit Content",
    color: "#A8FFB1",
    icon: IconEdit,
  },
};

export const Hierarchy: Story = {
  args: {
    actionName: "Hierarchy",
    color: "#AFB7FF",
    icon: IconHierarchy,
  },
};

export const ShareBento: Story = {
  args: {
    actionName: "Share",
    color: "#FED6FF",
    icon: IconShare,
  },
};

export const ChangeTheme: Story = {
  args: {
    actionName: "Change Theme",
    color: "#C0FBFF",
    icon: IconChangeTheme,
  },
};
