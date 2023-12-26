import { useEffect, useRef, useState } from "react";
import type { Color } from "../user/user";

export const useColorPickerState = () => {
  const menuElementRef = useRef<HTMLDivElement>(null);
  const menuOptionsRef = useRef<HTMLDivElement>(null);

  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => {
    const state = !showDialog;
    setShowDialog(state);
    handleMenuAnimation(state);
  };

  const handleMenuAnimation = (show: boolean) => {
    if (!menuOptionsRef.current) {
      return;
    }

    if (show) {
      menuOptionsRef.current.classList.remove("fade-out");
      menuOptionsRef.current.classList.remove("hidden");
      menuOptionsRef.current.classList.add("fade-in");
      return;
    }
    menuOptionsRef.current.classList.remove("fade-in");
    menuOptionsRef.current.classList.add("fade-out");
    setTimeout(() => {
      menuOptionsRef.current?.classList.add("hidden");
    }, 100);
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
        handleMenuAnimation(false);
      }
    };

    window.addEventListener("click", eventHandler);

    return () => {
      window.removeEventListener("click", eventHandler);
    };
  }, []);
  return {
    showDialog,
    toggleDialog,
    menuElementRef,
    menuOptionsRef,
  };
};
