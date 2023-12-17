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

  const commonStyle = 'px-8 py-4 font-semibold';
  const roundStyle = rounded? 'rounded-[33px]' : 'rounded-md';

  const buttonStyle = primary ? 'slate-blue color-primary': 'bg-black text-white'
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