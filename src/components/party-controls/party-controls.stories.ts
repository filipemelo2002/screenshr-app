import { PartyControls } from "./party-controls";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PartyControls> = {
  title: 'ScreenShr/Party Controls',
  component: PartyControls,
  parameters: {
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
   name: 'Heisenberg',
   partyCode: 'R4Y89',
   color: 'bg-blue',
   users: [
    {
      id: 'user-id-1',
      name: 'Jonathan Joestar',
      color: 'bg-pink'
    },
    {
      id: 'user-id-2',
      name: 'Dio Brando',
      color: 'bg-orange'
    },
    {
      id: 'user-id-3',
      name: 'Yoshikage Kira',
      color: 'bg-purple'
    },
   ]
  }
};