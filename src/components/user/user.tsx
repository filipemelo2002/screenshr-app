import Image from "next/image";
import userIcon from "../../../public/user.svg";

export type Color =
  | "bg-blue"
  | "bg-orange"
  | "bg-pink"
  | "bg-slate-blue"
  | "bg-purple"
  | "bg-light-blue"
  | "bg-yellow";
const colors = [
  "bg-blue",
  "bg-orange",
  "bg-pink",
  "bg-slate-blue",
  "bg-purple",
  "bg-light-blue",
  "bg-yellow",
];
interface UserProps {
  /**
   * show online badge?
   */
  isOnline?: boolean;
  /**
   *  What's your name?
   */
  name?: string;
  /**
   * What's your favorite colors?
   */
  color?: Color;
}
export const User = ({ isOnline = true, name, color }: UserProps) => {
  const background = color || colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className="flex flex-row gap-2 align-items-center justify-center">
      <div
        className={`flex align-items-center justify-center ${background} px-2.5 py-2.5 rounded-full relative max-w-[35px] max-h-[35px]`}
      >
        <Image src={userIcon} alt="User" className="w-4" />
        {isOnline && (
          <div className="w-[15px] h-[15px] bg-green absolute rounded-full left-[23px] top-[20px] border-[3px] border-midnight-black" />
        )}
      </div>
      {!!name && (
        <p className="my-auto font-sans font-semibold text-sm text-white">
          {name}
        </p>
      )}
    </div>
  );
};
