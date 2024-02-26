import { Color } from "@/components/user/user";
import { WebsocketService } from "@/services/websocket.service";
import { useRoomStore } from "@/zustand/room.store";
import { useUserStore } from "@/zustand/user.store";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

export const useCreateparty = () => {
  const color = useUserStore(useShallow((state) => state.color));
  const nicknameInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const socketService = useMemo(() => new WebsocketService(), []);
  const navigateBack = () => {
    router.push("/");
  };

  const onCreateParty = async () => {
    const nickname = nicknameInput.current?.value as string;
    const room = await socketService.createRoom({
      nickname,
      color,
    });

    useUserStore.setState((state) => ({
      ...state,
      nickname,
      color,
    }));

    useRoomStore.setState((state) => ({
      ...state,
      ...room,
      users: [],
    }));
    router.push(`/party/${room.id}`);
  };

  const setColor = (color: Color) => {
    useUserStore.setState((state) => ({ ...state, color }));
  };

  return {
    color,
    setColor,
    navigateBack,
    onCreateParty,
    nicknameInput,
  };
};
