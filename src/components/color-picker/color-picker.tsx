"use client";
import { ComponentPropsWithoutRef, HTMLProps } from "react";
import { Color } from "../user/user";
import { useColorPickerState } from "./color-picker.state";
import "./color-picker.styles.css";

export interface ColorPickerProps {
  /**
   * Color Picker's Label
   */
  label?: string;
  /**
   * Initial Color Picker's color
   */
  value: Color;

  /**
   * onChange event to return the selected color
   */
  onChange: (value: Color) => void;

  /**
   * Additional classes
   */
  className?: string;
}
export const ColorPicker = ({
  label,
  value,
  className = "",
  onChange,
}: ColorPickerProps) => {
  const { toggleDialog, menuElementRef, menuOptionsRef } =
    useColorPickerState();

  return (
    <div className={`relative w-fit ${className}`} ref={menuElementRef}>
      <div className="flex flex-col w-fit gap-3">
        {!!label && (
          <label className="font-bold font-sans text-sm text-steel-gray">
            {label}
          </label>
        )}
        <button
          className={`w-16 h-12 ${value} rounded-md text-white relative`}
          onClick={toggleDialog}
          type="button"
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
            type="button"
            onClick={() => {
              onChange("bg-blue");
              toggleDialog();
            }}
          ></button>
          <button
            className="bg-orange w-10 h-10 rounded-md"
            type="button"
            onClick={() => {
              onChange("bg-orange");
              toggleDialog();
            }}
          ></button>
          <button
            className="bg-pink w-10 h-10 rounded-md"
            type="button"
            onClick={() => {
              onChange("bg-pink");
              toggleDialog();
            }}
          ></button>
          <button
            className="bg-slate-blue w-10 h-10 rounded-md"
            type="button"
            onClick={() => {
              onChange("bg-slate-blue");
              toggleDialog();
            }}
          ></button>
          <button
            className="bg-purple w-10 h-10 rounded-md"
            type="button"
            onClick={() => {
              onChange("bg-purple");
              toggleDialog();
            }}
          ></button>
          <button
            className="bg-light-blue w-10 h-10 rounded-md"
            type="button"
            onClick={() => {
              onChange("bg-light-blue");
              toggleDialog();
            }}
          ></button>
          <button
            className="bg-yellow w-10 h-10 rounded-md"
            type="button"
            onClick={() => {
              onChange("bg-yellow");
              toggleDialog();
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};
