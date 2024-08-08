type CallBack = (stream: MediaStream) => void;

type ICECallBack = (id: string, candidate: RTCIceCandidate) => void;

type OnStreamEndCallback = (steam?: MediaStreamTrack, ev?: Event) => any;

export class WebRTC {
  // private peerConnection: RTCPeerConnection;
  // mediaStream: MediaStream | null = null;
  // private observable = new Observable<MediaStream>();
  private configuration: RTCConfiguration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  constructor() {
    // this.peerConnection = new RTCPeerConnection(this.configuration);
  }

  createConnection() {
    return new RTCPeerConnection(this.configuration);
  }

  async getMediaStream() {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    // this.mediaStream = mediaStream;
    // this.observable.notify(mediaStream);
    return mediaStream;
  }

  // onChangeMediaStream(cb: CallBack) {
  //   this.observable.subscribe(cb);
  // }

  sendStream(peerConnection: RTCPeerConnection, media?: MediaStream | null) {
    // if (!this.peerConnection) {
    //   throw new Error("Peer connection was not found.");
    // }
    // const media = this.mediaStream;
    if (media) {
      media.getTracks().forEach((track) => {
        peerConnection.addTrack(track, media);
      });
    }
  }

  // sendStreamToAll(mediaStream: MediaStream) {
  //   mediaStream.getTracks().forEach((track) => {
  //     this.peerConnection.addTrack(track, mediaStream);
  //   });
  // }

  async makeOffer(peerConnection: RTCPeerConnection) {
    const offer = await peerConnection.createOffer();
    return offer;
  }

  async makeAnswer(peerConnection: RTCPeerConnection) {
    const answer = await peerConnection.createAnswer();
    return answer;
  }

  async setRemoteOffer(
    peerConnection: RTCPeerConnection,
    offer: RTCSessionDescriptionInit,
  ) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  }

  async setLocalOffer(
    peerConnection: RTCPeerConnection,
    offer: RTCSessionDescriptionInit,
  ) {
    await peerConnection.setLocalDescription(offer);
  }

  onICECandidateChange(peerConnection: RTCPeerConnection, cb: ICECallBack) {
    peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        cb("ddfd", event.candidate);
      }
    };
  }

  async setICECandidate(
    peerConnection: RTCPeerConnection,
    candidate: RTCIceCandidate,
  ) {
    await peerConnection.addIceCandidate(candidate);
  }

  onStream(peerConnection: RTCPeerConnection, cb: CallBack) {
    peerConnection.ontrack = function ({ streams: [stream] }) {
      cb(stream);
    };
  }
}

// class Observable<T> {
//   private observers: Function[];

//   constructor() {
//     this.observers = [];
//   }

//   subscribe(cb: Function) {
//     this.observers.push(cb);
//   }
//   unsubscribe(cb: Function) {
//     this.observers = this.observers.filter((aux) => aux !== cb);
//   }
//   cleanup() {
//     this.observers = [];
//   }

//   notify(data: T) {
//     this.observers.forEach((subscriber) => subscriber(data));
//   }
// }
