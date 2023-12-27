import { Color } from "@/components/user/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useCreateparty = () => {
  const [color, setColor] = useState<Color>("bg-blue");
  const router = useRouter();
  const navigateBack = () => {
    router.push("/");
  };
  return {
    color,
    setColor,
    navigateBack,
  };
};
