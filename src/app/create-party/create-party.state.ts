import { Color } from "@/components/user/user";
import { WebsocketService } from "@/services/websocket.service";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export const useCreateparty = () => {
  const [color, setColor] = useState<Color>("bg-blue");
  const router = useRouter();
  const socketService = useMemo(() => new WebsocketService(), []);
  const navigateBack = () => {
    router.push("/");
  };

  const onCreateParty = () => {
    socketService.createRoom({
      nickname: "filipe",
      color: "bg-blue",
    });
  };

  return {
    color,
    setColor,
    navigateBack,
    onCreateParty,
  };
};
