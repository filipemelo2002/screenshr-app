import { User } from "./user";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof User> = {
  title: 'ScreenShr/User',
  component: User,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
    isOnline: false,
    name: 'Entertaining Muffin'
  }
};