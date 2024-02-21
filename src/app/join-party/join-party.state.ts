import { Color } from "@/components/user/user";
import { WebsocketService } from "@/services/websocket.service";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const KEYS = {
  BACKSPACE: "Backspace",
};
export const useJoinParty = () => {
  const [color, setColor] = useState<Color>("bg-blue");
  const partyCodeInputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const nicknameInput = useRef<HTMLInputElement>(null);
  const socketService = useMemo(() => new WebsocketService(), []);

  const navigateBack = () => {
    router.push("/");
  };

  const focusElement = (index: number, key: string) => {
    if (key === KEYS.BACKSPACE) {
      if (index <= 0) {
        return;
      }
      partyCodeInputRefs.current[index - 1]?.focus();
      return;
    }
    const isValidCharacter = /^[a-zA-Z0-9]$/.test(key);
    if (index === partyCodeInputRefs.current.length - 1 || !isValidCharacter) {
      return;
    }

    partyCodeInputRefs.current[index + 1]?.focus();
  };

  const assignValue = (index: number, key: string) => {
    const input = partyCodeInputRefs.current[index];
    if (!input) {
      throw new Error("Could not find input at index " + index);
    }

    const regex = /^[a-zA-Z0-9]$/;
    if (!regex.test(key)) {
      return;
    }
    input.value = key;
  };

  const getPartyCode = () => {
    return [...partyCodeInputRefs.current].reduce(
      (code, input) => code + input.value,
      "",
    );
  };

  const validateInputs = () => {
    if (!nicknameInput.current || !partyCodeInputRefs.current || !color) {
      throw new Error("Inputs were not properly initialized");
    }

    const nickname = nicknameInput.current.value;
    const partyCode = getPartyCode();
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
    const partyCode = getPartyCode();

    socketService.joinRoom({
      nickname: nickname,
      roomId: partyCode,
      color,
    });
  };

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      const inputIndex = partyCodeInputRefs.current.findIndex(
        (el) => el === event.target,
      );
      assignValue(inputIndex, event.key);
      focusElement(inputIndex, event.key);
    };

    const inputs = partyCodeInputRefs.current;
    inputs.forEach((element) => {
      element.addEventListener("keyup", eventHandler);
    });

    return () => {
      inputs.forEach((element) => {
        element.removeEventListener("keyup", eventHandler);
      });
    };
  }, []);
  return {
    navigateBack,
    color,
    setColor,
    partyCodeInputRefs,
    nicknameInput,
    onJoinParty,
  };
};
