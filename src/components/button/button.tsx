import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;

  /**
   * Button's inner-content
   */
  children: ReactNode;

  /**
   * Roundy button?
   */
  rounded?: boolean;
}

export const Button = ({
  children,
  primary = false,
  rounded = false,
  className,
  ...props
}: ButtonProps) => {
  const commonStyle =
    "px-6 py-3 md:px-8 md:py-4 font-semibold hover:drop-shadow-[0_0px_10px_rgba(255,_255,_255,_0.1)] transition-all text-xs md:text-base";
  const roundStyle = rounded ? "rounded-[33px]" : "rounded-md";

  const buttonStyle = primary
    ? "bg-primary color-primary"
    : "bg-black text-white";
  return (
    <button
      className={`${buttonStyle} ${commonStyle} ${roundStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
