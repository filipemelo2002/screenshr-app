import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input's Label
   */
  label?: string;
}

type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, InputProps>(
  ({ label, className = "", ...props }: InputProps, ref) => {
    return (
      <div className="flex  flex-col gap-3">
        {!!label && (
          <label className="font-bold font-sans text-sm text-steel-gray">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`font-sans w-full flex items-center text-sm leading-6 rounded-md py-3 pl-3 pr-3 shadow-sm text-gray-400 dark:text-white/50 dark:bg-background-dark dark:brightness-[1.1] dark:ring-1 dark:hover:brightness-[1.25] bg-midnight-black ring-1 ring-gray-400/20 hover:ring-gray-600/25 dark:ring-gray-600/30 dark:hover:ring-gray-500/30 focus:outline-primary border-carcoal-gray ${className}`}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";
