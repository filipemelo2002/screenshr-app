import { useUserStore } from "@/zustand/user.store";
import { useRouter } from "next/navigation";

export const useParty = () => {
  const router = useRouter();

  const { nickname, color, id, isStreaming } = useUserStore();

  const navigateBack = () => {
    router.push("/");
  };

  return {
    navigateBack,
    isStreaming,
    nickname,
    color,
    id,
  };
};
