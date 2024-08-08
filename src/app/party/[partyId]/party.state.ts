import { WebRTC } from "@/services/webrtc.service";
import { WebsocketService } from "@/services/websocket.service";
import { useRoomStore } from "@/zustand/room.store";
import { UserState, useUserStore } from "@/zustand/user.store";
import { useParams, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const useParty = () => {
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const webrtcService = useMemo(() => new WebRTC(), []);
  const socketService = useMemo(() => new WebsocketService(), []);

  const router = useRouter();

  const { nickname, color, id: userId, isStreaming } = useUserStore();
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
      const newMediaStream = await webrtcService.getMediaStream();
      videoRef.current.srcObject = newMediaStream;
      setMediaStream(newMediaStream);
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

    if (newUserId && owner === userId) {
      const newPeerConnection = webrtcService.createConnection();
      webrtcService.sendStream(newPeerConnection, mediaStream);
      const offer = await webrtcService.makeOffer(newPeerConnection);
      await webrtcService.setLocalOffer(newPeerConnection, offer);
      webrtcService.onICECandidateChange(newPeerConnection, (id, candidate) => {
        socketService.sendIceCandidate(roomId, newUserId, candidate);
      });
      socketService.onReceiveIceCandidate(async (id, candidate) => {
        await webrtcService.setICECandidate(newPeerConnection, candidate);
      });
      socketService.sendOffer(roomId, newUserId, offer);
      setPeerConnection(newPeerConnection);
    }
  }

  async function handleOnReceiveOffer(
    id: string,
    offer: RTCSessionDescriptionInit,
  ) {
    const newPeerConnection = webrtcService.createConnection();
    await webrtcService.setRemoteOffer(newPeerConnection, offer);
    const answer = await webrtcService.makeAnswer(newPeerConnection);
    await webrtcService.setLocalOffer(newPeerConnection, answer);
    webrtcService.onICECandidateChange(newPeerConnection, (_, candidate) => {
      socketService.sendIceCandidate(roomId, id, candidate);
    });
    socketService.onReceiveIceCandidate(async (id, candidate) => {
      await webrtcService.setICECandidate(newPeerConnection, candidate);
    });
    socketService.sendAnswer(roomId, id, answer);
    webrtcService.onStream(newPeerConnection, (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    });
    setPeerConnection(newPeerConnection);
  }

  async function handleOnReceiveAnswer(
    id: string,
    answer: RTCSessionDescriptionInit,
  ) {
    if (!peerConnection) {
      throw new Error(
        "no peerconnection created so far at handleOnReceiveAnswer",
      );
    }
    await webrtcService.setRemoteOffer(peerConnection, answer);
  }

  // async function handleOnChangeMediaStream(mediaStream: MediaStream) {
  //   webrtcService.sendStreamToAll(mediaStream);
  //   mediaStream.getTracks().forEach((track) => {
  //     track.onended = () => {
  //       useUserStore.setState((state) => ({ ...state, isStreaming: false }));
  //       if (videoRef.current) {
  //         videoRef.current.pause();
  //         videoRef.current.srcObject = null;
  //       }
  //     };
  //   });
  // }
  useLayoutEffect(() => {
    if (!nickname || !roomId) {
      router.push(`/join-party?roomId=${partyId}`);
    }
  }, [nickname, roomId, router, partyId]);

  useLayoutEffect(() => {
    socketService.onUpdateUsers(handleOnUpdateUsers);
    socketService.onReceiveOffer(handleOnReceiveOffer);
    socketService.onReceiveAnswer(handleOnReceiveAnswer);
    // socketService.onReceiveIceCandidate(handleOnReceiveIceCandidate);
    // webrtcService.onChangeMediaStream(handleOnChangeMediaStream);
    return () => {
      socketService.unsubscribe();
    };
  }, [peerConnection, mediaStream]);

  return {
    navigateBack,
    isStreaming,
    nickname,
    color,
    id: userId,
    users,
    videoRef,
    toggleStream,
  };
};
