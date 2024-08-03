type CallBack = (stream: MediaStream) => void;

type ICECallBack = (id: string, candidate: RTCIceCandidate) => void;

type OnStreamEndCallback = (steam?: MediaStreamTrack, ev?: Event) => any;

export class WebRTC {
  private peerConnection: Map<string, RTCPeerConnection>;
  mediaStream: MediaStream | null = null;

  private configuration: RTCConfiguration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  constructor() {
    this.peerConnection = new Map<string, RTCPeerConnection>();
  }

  async getMediaStream(cb: OnStreamEndCallback) {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    this.mediaStream = mediaStream;
    mediaStream.getTracks().forEach((track) => {
      this.peerConnection.forEach((peerConnection) => {
        peerConnection.addTrack(track, mediaStream);
      });
      track.onended = function (this: MediaStreamTrack, e: Event) {
        cb(this, e);
      };
    });
    return mediaStream;
  }

  async makeOffer(id: string) {
    let peerConnection = this.peerConnection.get(id);

    if (!peerConnection) {
      peerConnection = new RTCPeerConnection(this.configuration);
    }
    this.peerConnection.set(id, peerConnection);

    const offer = await peerConnection.createOffer();
    return offer;
  }

  async makeAnswer(id: string) {
    let peerConnection = this.peerConnection.get(id);

    if (!peerConnection) {
      throw new Error("Peer connection for given id " + id + " was not found.");
    }

    const answer = await peerConnection.createAnswer();
    return answer;
  }

  async setRemoteOffer(id: string, offer: RTCSessionDescriptionInit) {
    let peerConnection = this.peerConnection.get(id);

    if (!peerConnection) {
      peerConnection = new RTCPeerConnection(this.configuration);
      this.peerConnection.set(id, peerConnection);
    }

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  }

  async setLocalOffer(id: string, offer: RTCSessionDescriptionInit) {
    const peerConnection = this.peerConnection.get(id);

    if (!peerConnection) {
      throw new Error("Peer connection for given id " + id + " was not found.");
    }

    await peerConnection.setLocalDescription(offer);
  }

  onICECandidateChange(id: string, cb: ICECallBack) {
    const peerConnection = this.peerConnection.get(id);

    if (!peerConnection) {
      throw new Error("Peer connection for given id " + id + " was not found.");
    }

    peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        cb(id, event.candidate);
      }
    };
  }

  async setICECandidate(id: string, candidate: RTCIceCandidate) {
    const peerConnection = this.peerConnection.get(id);

    if (!peerConnection) {
      throw new Error("Peer connection for given id " + id + " was not found.");
    }

    peerConnection.addIceCandidate(candidate);
  }

  onStream(id: string, cb: CallBack) {
    const peerConnection = this.peerConnection.get(id);

    if (!peerConnection) {
      throw new Error("Peer connection for given id " + id + " was not found.");
    }

    peerConnection.ontrack = function ({ streams: [stream] }) {
      cb(stream);
    };
  }
}
