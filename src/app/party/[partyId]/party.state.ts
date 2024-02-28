import { WebsocketService } from "@/services/websocket.service";
import { useRoomStore } from "@/zustand/room.store";
import { useUserStore } from "@/zustand/user.store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

export const useParty = () => {
  const router = useRouter();

  const { nickname, color, id, isStreaming } = useUserStore();
  const { id: roomId, users } = useRoomStore();
  const { partyId } = useParams<{ partyId: string }>();

  const socketService = useRef(new WebsocketService()).current;

  const navigateBack = () => {
    router.push("/");
  };

  useLayoutEffect(() => {
    if (!nickname || !roomId) {
      router.push(`/join-party?roomId=${partyId}`);
    }
  }, [nickname, roomId, router, partyId]);

  useEffect(() => {
    socketService.onUpdateUsers((users) => {
      useRoomStore.setState((state) => ({
        ...state,
        users,
      }));
    });
  }, [socketService]);

  return {
    navigateBack,
    isStreaming,
    nickname,
    color,
    id,
    users,
  };
};
