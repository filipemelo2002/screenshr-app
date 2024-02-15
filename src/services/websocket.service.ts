import { Socket, io } from "socket.io-client";

export const WEBSOCKET_EVENTS = {
  CREATE_ROOM: "room/create",
};

export class WebsocketService {
  private websocket: Socket;

  constructor() {
    this.websocket = io("http://localhost:3000/", {
      transports: ["websocket"],
    });
  }

  async createRoom({ nickname, color }: { nickname: string; color: string }) {
    await fetch("http://localhost:3000/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, color, owner: this.websocket.id }),
    });
  }
}
