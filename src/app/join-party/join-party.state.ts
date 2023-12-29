import { Color } from "@/components/user/user";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const KEYS = {
  BACKSPACE: "Backspace",
};
export const useJoinParty = () => {
  const [color, setColor] = useState<Color>("bg-blue");
  const partyCodeInputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();

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

    if (index === partyCodeInputRefs.current.length - 1) {
      return;
    }

    partyCodeInputRefs.current[index + 1]?.focus();
  };

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      const inputIndex = partyCodeInputRefs.current.findIndex(
        (el) => el === event.target,
      );
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
  };
};
