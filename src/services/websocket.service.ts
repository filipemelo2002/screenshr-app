import { EVENTS } from "@/utils/event-keys";
import { Socket, io } from "socket.io-client";

export const WEBSOCKET_EVENTS = {
  CREATE_ROOM: "room/create",
};

export interface Room {
  id: string;
  owner: string;
  users: string[];
}

interface CreateRoomRequest {
  nickname: string;
  color: string;
}

interface JoinRoomRequest {
  nickname: string;
  color: string;
  roomId: string;
}

const websocket = io("http://localhost:3000/", {
  transports: ["websocket"],
});

export class WebsocketService {
  async createRoom({ nickname, color }: CreateRoomRequest): Promise<Room> {
    const response = await fetch("http://localhost:3000/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, color, owner: websocket.id }),
    });

    const data = await response.json();

    return {
      id: data.room.id,
      owner: data.room.owner,
      users: data.room.users,
    };
  }

  async joinRoom({ nickname, color, roomId }: JoinRoomRequest) {
    websocket.emit(EVENTS.JOIN_ROOM, {
      nickname,
      color,
      roomId,
    });
  }
}
