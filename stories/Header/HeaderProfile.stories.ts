import type { Meta, StoryObj } from "@storybook/react";

import HeaderProfile from "@/components/kitchen/header/HeaderProfile";

const meta = {
  title: "TinyBento/Header/HeaderProfile",
  component: HeaderProfile,
} satisfies Meta<typeof HeaderProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Jacob: Story = {
  args: {
    userName: "Jacob Lurie",
    bentoName: "Jacob's Jolly Jamboree",
  },
};

export const William: Story = {
  args: {
    userName: "William Wu",
    bentoName: "William's Wonderful World of Wonders",
  },
};

export const Zi: Story = {
  args: {
    userName: "Zi Teoh",
    bentoName: "My Life in a Bentobox",
  },
};
