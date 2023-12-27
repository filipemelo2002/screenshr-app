import Link from "next/link";
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

  /**
   * Is it a link instead?
   */
  href?: string;
}

export const Button = ({
  children,
  primary = false,
  rounded = false,
  className,
  onClick,
  href,
  ...props
}: ButtonProps) => {
  const commonStyle =
    "px-6 py-3 font-semibold hover:drop-shadow-[0_0px_10px_rgba(255,_255,_255,_0.1)] transition-all text-xs md:text-base";
  const roundStyle = rounded ? "rounded-[33px]" : "rounded-md";

  const buttonStyle = primary
    ? "bg-primary color-primary"
    : "bg-black text-white";

  if (!onClick && href) {
    return (
      <Link
        href={href}
        className={`${buttonStyle} ${commonStyle} ${roundStyle} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${buttonStyle} ${commonStyle} ${roundStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
