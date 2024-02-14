import { useRouter } from "next/navigation";
import { useState } from "react";

export const useParty = () => {
  const router = useRouter();
  const [isStreaming, setIsStreaming] = useState(true);

  const navigateBack = () => {
    router.push("/");
  };

  return {
    navigateBack,
    isStreaming,
  };
};
