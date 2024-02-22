import { Room } from "@/services/websocket.service";
import { create } from "zustand";

export const useRoomStore = create<Room>(() => ({
  id: "",
  owner: "",
  users: [],
}));
