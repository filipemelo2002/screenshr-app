import { ColorPicker } from "./color-picker";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ColorPicker> = {
  title: "ScreenShr/Color Picker",
  component: ColorPicker,
  parameters: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
