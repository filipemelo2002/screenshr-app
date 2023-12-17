import { ReactNode } from "react"

interface ButtonProps {
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
  primary=false,
  rounded=false
}: ButtonProps) => {

  const commonStyle = 'px-8 py-4 font-semibold hover:drop-shadow-[0_0px_10px_rgba(255,_255,_255,_0.1)] transition-all';
  const roundStyle = rounded? 'rounded-[33px]' : 'rounded-md';

  const buttonStyle = primary ? 'bg-primary color-primary': 'bg-black text-white'
  return (
    <button
      className={`${buttonStyle} ${commonStyle} ${roundStyle}`}
    >
      {
        children
      }
    </button>
  )
}