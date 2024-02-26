import { useRoomStore } from "@/zustand/room.store";
import { useUserStore } from "@/zustand/user.store";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export const useParty = () => {
  const router = useRouter();

  const { nickname, color, id, isStreaming } = useUserStore();
  const { id: roomId } = useRoomStore();

  const navigateBack = () => {
    router.push("/");
  };

  useLayoutEffect(() => {
    if (!nickname || !roomId) {
      router.push("/join-party");
    }
  }, [nickname, roomId, router]);

  return {
    navigateBack,
    isStreaming,
    nickname,
    color,
    id,
  };
};
