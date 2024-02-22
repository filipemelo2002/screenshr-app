import { Color } from "@/components/user/user";
import { create } from "zustand";

interface UserState {
  nickname: string;
  id: string;
  color: Color;
  isStreaming: boolean;
}
export const useUserStore = create<UserState>(() => ({
  nickname: "",
  id: "",
  color: "bg-blue",
  isStreaming: false,
}));
