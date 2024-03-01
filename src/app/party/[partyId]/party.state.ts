import { WebRTC } from "@/services/webrtc.service";
import { WebsocketService } from "@/services/websocket.service";
import { useRoomStore } from "@/zustand/room.store";
import { useUserStore } from "@/zustand/user.store";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const webrtcService = new WebRTC();
const socketService = new WebsocketService();
export const useParty = () => {
  const router = useRouter();

  const { nickname, color, id, isStreaming } = useUserStore();
  const { id: roomId, users } = useRoomStore();
  const { partyId } = useParams<{ partyId: string }>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const navigateBack = () => {
    router.push("/");
  };

  const toggleStream = useCallback(async (value: boolean) => {
    if (!videoRef.current) {
      alert("Could not find local video element");
      return;
    }

    if (!value && videoRef.current) {
      videoRef.current.srcObject = null;
      useUserStore.setState((state) => ({ ...state, isStreaming: value }));
      return;
    }

    try {
      const mediaStream = await webrtcService.getMediaStream();
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
      useUserStore.setState((state) => ({ ...state, isStreaming: true }));
    } catch (exception) {
      useUserStore.setState((state) => ({ ...state, isStreaming: false }));
    }
  }, []);

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
  }, []);

  return {
    navigateBack,
    isStreaming,
    nickname,
    color,
    id,
    users,
    videoRef,
    toggleStream,
  };
};
