import { WebRTC } from "@/services/webrtc.service";
import { WebsocketService } from "@/services/websocket.service";
import { useRoomStore } from "@/zustand/room.store";
import { UserState, useUserStore } from "@/zustand/user.store";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const webrtcService = new WebRTC();
const socketService = new WebsocketService();
export const useParty = () => {
  const router = useRouter();

  const { nickname, color, id, isStreaming } = useUserStore();
  const { id: roomId, users, owner } = useRoomStore();
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
      const mediaStream = await webrtcService.getMediaStream(() => {
        useUserStore.setState((state) => ({ ...state, isStreaming: false }));
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.srcObject = null;
        }
      });
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
      useUserStore.setState((state) => ({ ...state, isStreaming: true }));
    } catch (exception) {
      useUserStore.setState((state) => ({ ...state, isStreaming: false }));
    }
  }, []);

  async function handleOnUpdateUsers({
    users,
    newUserId,
  }: {
    users: UserState[];
    newUserId: string;
  }) {
    useRoomStore.setState((state) => ({
      ...state,
      users,
    }));

    if (newUserId && owner === id) {
      const offer = await webrtcService.makeOffer(newUserId);
      socketService.sendOffer(roomId, newUserId, offer);
    }
  }

  async function handleOnReceiveOffer(
    id: string,
    offer: RTCSessionDescriptionInit,
  ) {
    await webrtcService.setRemoteOffer(id, offer);
    const answer = await webrtcService.makeAnswer(id);
    await webrtcService.setLocalOffer(id, answer);
    socketService.sendAnswer(roomId, id, answer);
  }

  async function handleOnReceiveAnswer(
    id: string,
    answer: RTCSessionDescriptionInit,
  ) {
    await webrtcService.setRemoteOffer(id, answer);
  }

  useLayoutEffect(() => {
    if (!nickname || !roomId) {
      router.push(`/join-party?roomId=${partyId}`);
    }
  }, [nickname, roomId, router, partyId]);

  useLayoutEffect(() => {
    socketService.onUpdateUsers(handleOnUpdateUsers);
    socketService.onReceiveOffer(handleOnReceiveOffer);
    socketService.onReceiveAnswer(handleOnReceiveAnswer);
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
