import { useState } from "react";

export interface UsePartyConstrolsProps {
  isStreaming: boolean;
  onChangeStreaming: (val: boolean) => void;
}
export const usePartyConstrols = ({
  isStreaming,
  onChangeStreaming
}: UsePartyConstrolsProps) => {

  const [streaming, setStreaming] = useState(isStreaming);


  const toggleStreaming = () => {
    setStreaming(!streaming);
    onChangeStreaming(!streaming);
  }

  return {
    streaming,
    toggleStreaming
  }
}