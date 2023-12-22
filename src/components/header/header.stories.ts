import { Header } from "./header";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
  title: 'ScreenShr/Header',
  component: Header,
  parameters: {
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
   
  }
};