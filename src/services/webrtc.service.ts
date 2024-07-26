type CallBack = (stream: MediaStream) => void;

type ICECallBack = (candidate: RTCIceCandidate) => void;

type OnStreamEndCallback = (steam?: MediaStreamTrack, ev?: Event) => any;

export class WebRTC {
  private peerConnection: RTCPeerConnection;
  mediaStream: MediaStream | null = null;

  constructor() {
    const configuration: RTCConfiguration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    this.peerConnection = new RTCPeerConnection(configuration);
  }

  async getMediaStream(cb: OnStreamEndCallback) {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    this.mediaStream = mediaStream;
    mediaStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, mediaStream);
      track.onended = function (this: MediaStreamTrack, e: Event) {
        cb(this, e);
      };
    });
    return mediaStream;
  }

  async makeOffer() {
    const offer = await this.peerConnection.createOffer();
    return offer;
  }

  async makeAnswer() {
    const answer = await this.peerConnection.createAnswer();
    return answer;
  }

  async setRemoteOffer(offer: RTCSessionDescriptionInit) {
    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(offer),
    );
  }

  async setLocalOffer(offer: RTCSessionDescriptionInit) {
    await this.peerConnection.setLocalDescription(offer);
  }

  onICECandidateChange(cb: ICECallBack) {
    this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        cb(event.candidate);
      }
    };
  }

  async setICECandidate(candidate: RTCIceCandidate) {
    await this.peerConnection.addIceCandidate(candidate);
  }

  onStream(cb: CallBack) {
    this.peerConnection.ontrack = function ({ streams: [stream] }) {
      cb(stream);
    };
  }
}
