import React, { SVGAttributes } from "react";

export default function ChevronRight(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.72098 10.5L7.31473 7L4.72098 3.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#6C6C6C"
      />
    </svg>
  );
}
