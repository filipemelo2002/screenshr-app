import { UserState } from "@/zustand/user.store";
import { Socket, io } from "socket.io-client";

const websocket: Socket<ServerToClient, ClientToServer> = io(
  "http://localhost:3000/",
  {
    transports: ["websocket"],
  },
);

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
    websocket.emit("room/join", {
      nickname,
      color,
      roomId,
    });
  }

  onUpdateUsers(cb: (val?: any) => void) {
    websocket.on("room/update-users", (event) => {
      const users = event.users.filter((user) => user.id !== websocket.id);
      cb(users);
    });
  }
}

export interface Room {
  id: string;
  owner: string;
  users: UserState[];
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

export const WEBSOCKET_EVENTS = {
  CREATE_ROOM: "room/create",
  JOIN_ROOM: "room/join",
  UPDATE_USERS: "room/update-users",
};

interface ServerToClient {
  "room/update-users": (args: { users: UserState[] }) => void;
}

interface ClientToServer {
  "room/create": (arg: CreateRoomRequest) => void;
  "room/join": (arg: JoinRoomRequest) => void;
}
