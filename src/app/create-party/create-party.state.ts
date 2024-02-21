import { Color } from "@/components/user/user";
import { WebsocketService } from "@/services/websocket.service";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

export const useCreateparty = () => {
  const [color, setColor] = useState<Color>("bg-blue");
  const nicknameInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const socketService = useMemo(() => new WebsocketService(), []);
  const navigateBack = () => {
    router.push("/");
  };

  const onCreateParty = async () => {
    const room = await socketService.createRoom({
      nickname: nicknameInput.current?.value as string,
      color,
    });

    router.push(`/party/${room.id}`);
  };

  return {
    color,
    setColor,
    navigateBack,
    onCreateParty,
    nicknameInput,
  };
};
