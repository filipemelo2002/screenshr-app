import { useEffect, useRef, useState } from "react";
import type { Color } from "../user/user";

interface UseColorPickerStateProps {
  initialColor?: Color;
}
export const useColorPickerState = ({
  initialColor = "bg-blue",
}: UseColorPickerStateProps) => {
  const menuElementRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(initialColor);
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => {
    setShowDialog((state) => !state);
  };

  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      const clickedElement = event.target;

      if (!menuElementRef.current || !(clickedElement instanceof Element)) {
        return;
      }

      if (
        clickedElement !== menuElementRef.current &&
        !menuElementRef.current.contains(clickedElement)
      ) {
        setShowDialog(false);
      }
    };

    window.addEventListener("click", eventHandler);

    return () => {
      window.removeEventListener("click", eventHandler);
    };
  }, []);
  return {
    showDialog,
    color,
    setColor,
    toggleDialog,
    menuElementRef,
  };
};
