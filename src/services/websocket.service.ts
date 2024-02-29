import { UserState } from "@/zustand/user.store";
import { Socket, io } from "socket.io-client";

const websocket: Socket<ServerToClient, ClientToServer> = io(
  "http://localhost:3000/",
  {
    transports: ["websocket"],
  },
);

export class WebsocketService {
  async createRoom(
    { nickname, color }: CreateRoomRequest,
    cb: (val: CreateRoomResponse) => void,
  ) {
    websocket.emit(
      "room/create",
      {
        color,
        nickname,
      },
      cb,
    );
  }

  async joinRoom({
    nickname,
    color,
    roomId,
  }: JoinRoomRequest): Promise<JoinRoomResponse> {
    const response = await fetch("http://localhost:3000/rooms/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, color, id: websocket.id, roomId }),
    });

    const data = await response.json();

    websocket.emit("room/join", {
      roomId,
    });

    return {
      user: data.user,
      room: data.room,
      users: data.users,
    };
  }

  onUpdateUsers(cb: (val?: any) => void) {
    websocket.on("room/update-users", (event) => {
      const users = event.users.filter((user) => user.id !== websocket.id);
      cb(users);
    });
  }

  getId() {
    return websocket.id;
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

interface CreateRoomResponse {
  user: UserState;
  room: Room;
}

interface JoinRoomRequest {
  nickname: string;
  color: string;
  roomId: string;
}

interface JoinRoomResponse {
  users: UserState[];
  room: Room;
  user: UserState;
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
  "room/create": (
    arg: CreateRoomRequest,
    callback: (data: CreateRoomResponse) => void,
  ) => void;
  "room/join": (
    arg: { roomId: string },
    callback?: (data: JoinRoomResponse) => void,
  ) => void;
}
