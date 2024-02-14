import { useState } from "react";

export interface UsePartyConstrolsProps {
  isStreaming: boolean;
  onChangeStreaming: (val: boolean) => void;
}
export const usePartyConstrols = ({
  isStreaming,
  onChangeStreaming,
}: UsePartyConstrolsProps) => {
  const [streaming, setStreaming] = useState(isStreaming);
  const [open, setOpen] = useState(true);

  const toggleStreaming = () => {
    setStreaming(!streaming);
    onChangeStreaming(!streaming);
  };

  const toggleOpen = () => {
    setOpen((val) => !val);
  };

  return {
    streaming,
    toggleStreaming,
    open,
    toggleOpen,
  };
};
