import { Color } from "@/components/user/user";
import { WebsocketService } from "@/services/websocket.service";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

export const useJoinParty = () => {
  const [color, setColor] = useState<Color>("bg-blue");
  const partyCodeInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const nicknameInput = useRef<HTMLInputElement>(null);
  const socketService = useMemo(() => new WebsocketService(), []);

  const navigateBack = () => {
    router.push("/");
  };

  const validateInputs = () => {
    if (!nicknameInput.current || !partyCodeInputRef.current || !color) {
      throw new Error("Inputs were not properly initialized");
    }

    const nickname = nicknameInput.current.value;
    const partyCode = partyCodeInputRef.current.value;
    if (!nickname || !partyCode) {
      throw new Error("Inputs must not be empty");
    }

    if (partyCode.length < 5) {
      throw new Error("Invalid Party code");
    }

    return true;
  };
  const onJoinParty = () => {
    if (!validateInputs()) {
      return;
    }
    const nickname = nicknameInput.current?.value as string;
    const partyCode = partyCodeInputRef.current?.value as string;

    socketService.joinRoom({
      nickname: nickname,
      roomId: partyCode,
      color,
    });
  };

  return {
    navigateBack,
    color,
    setColor,
    partyCodeInputRef,
    nicknameInput,
    onJoinParty,
  };
};
