import { useState } from "react";

export interface UsePartyConstrolsProps {
  isStreaming: boolean;
  onChangeStreaming: (val: boolean) => void;
}
export const usePartyConstrols = ({
  isStreaming,
  onChangeStreaming,
}: UsePartyConstrolsProps) => {
  const [open, setOpen] = useState(true);

  const toggleStreaming = () => {
    onChangeStreaming(!isStreaming);
  };

  const toggleOpen = () => {
    setOpen((val) => !val);
  };

  return {
    streaming: isStreaming,
    toggleStreaming,
    open,
    toggleOpen,
  };
};
