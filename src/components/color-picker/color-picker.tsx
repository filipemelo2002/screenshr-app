import { Color } from "../user/user";
import { useColorPickerState } from "./color-picker.state";
import "./color-picker.styles.css";

export interface ColorPickerProps {
  /**
   * Initial Color Picker's color
   */
  value: Color;

  /**
   * onChange event to return the selected color
   */
  onChange: (value: Color) => void;
}
export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const { toggleDialog, menuElementRef, menuOptionsRef } =
    useColorPickerState();

  return (
    <div className="relative w-fit" ref={menuElementRef}>
      <div className="flex flex-col overflow-hidden w-fit">
        <label className="font-bold font-sans text-sm text-steel-gray">
          Profile Color
        </label>
        <button
          className={`w-15 h-12 ${value} mt-3 rounded-md text-white relative`}
          onClick={toggleDialog}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-pencil absolute right-2 top-2"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
      </div>

      <div
        className={`absolute z-10 mt-2 w-[214px] rounded-md border border-black bg-carcoal-gray shadow-lg hidden fade-out`}
        ref={menuOptionsRef}
        role="menu"
      >
        <div className="flex p-2 gap-3 flex-wrap">
          <button
            className="bg-blue w-10 h-10 rounded-md"
            onClick={() => onChange("bg-blue")}
          ></button>
          <button
            className="bg-orange w-10 h-10 rounded-md"
            onClick={() => onChange("bg-orange")}
          ></button>
          <button
            className="bg-pink w-10 h-10 rounded-md"
            onClick={() => onChange("bg-pink")}
          ></button>
          <button
            className="bg-slate-blue w-10 h-10 rounded-md"
            onClick={() => onChange("bg-slate-blue")}
          ></button>
          <button
            className="bg-purple w-10 h-10 rounded-md"
            onClick={() => onChange("bg-purple")}
          ></button>
          <button
            className="bg-light-blue w-10 h-10 rounded-md"
            onClick={() => onChange("bg-light-blue")}
          ></button>
          <button
            className="bg-yellow w-10 h-10 rounded-md"
            onClick={() => onChange("bg-yellow")}
          ></button>
        </div>
      </div>
    </div>
  );
};
