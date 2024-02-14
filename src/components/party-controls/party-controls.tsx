import Image from "next/image";
import { Color, User } from "../user/user";
import castIcon from "../../../public/cast.svg";
import stopCastIcon from "../../../public/stop-cast.svg";
import removeIcon from "../../../public/remove.svg";
import copyIcon from "../../../public/copy.svg";
import { usePartyConstrols } from "./party-controls.state";
import "./party-controls.styles.css";

interface User {
  id: string;
  name: string;
  color?: Color;
}

interface PartyControlsProps {
  /**
   * What's your name?
   */
  name: string;
  /**
   * What's your favorite color?
   */
  color?: Color;
  /**
   * Are you currently streaming?
   */
  isStreaming?: boolean;
  /**
   * Party Code
   */
  partyCode: string;

  /**
   * Toggled whenever user clicks on the streaming icon
   */
  onChangeStreaming: (status: boolean) => void;

  /**
   * Called whenever user attempts to remove a user
   */
  onRemoveUser: (id: string) => void;

  /**
   * User's array object
   */
  users: User[];

  /**
   * Additional classes
   */
  className?: string;
}

export const PartyControls = ({
  name,
  color,
  isStreaming = false,
  partyCode,
  onChangeStreaming,
  onRemoveUser,
  className = "",
  users,
}: PartyControlsProps) => {
  const { streaming, toggleStreaming, toggleOpen } = usePartyConstrols({
    isStreaming,
    onChangeStreaming,
  });
  return (
    <div
      className={`flexflex-column  bg-midnight-black min-w-[274px] party-controls ${className}`}
    >
      <header
        className="flex px-3 py-2 justify-between align-items-center w-full"
        onClick={toggleOpen}
      >
        <User name={name} color={color} />
        <button onClick={toggleStreaming}>
          <Image
            src={streaming ? stopCastIcon : castIcon}
            width={20}
            alt="Streaming"
          />
        </button>
      </header>
      <div className="flex flex-col party-controls__container">
        <ul className="flex flex-col gap-4 bg-dark-gray px-3 py-2 w-full">
          {users.map((user) => (
            <li
              className="flex w-full align-items-center justify-between"
              key={user.id}
            >
              <User name={user.name} color={user.color} />
              <button onClick={() => onRemoveUser("user-id")}>
                <Image src={removeIcon} alt="Remove" width={15} />
              </button>
            </li>
          ))}
        </ul>
        <footer className="flex py-4 px-3 text-white align-items-center">
          <p>
            Party code:{" "}
            <label className="font-bold">{partyCode.toUpperCase()}</label>
          </p>
          <Image src={copyIcon} alt="copy" width={17} className="ml-3 mt-1" />
        </footer>
      </div>
    </div>
  );
};
