interface NavbarProps {
  /**
   * NavBar button label
   */
  label?: string;
  /**
   * button onClick event
   */
  onClick?: () => void;
  /**
   * Navbar additional className
   */
  className?: string;
}
export const Navbar = ({ label = "Home", onClick = () => {} }: NavbarProps) => {
  return (
    <div className="flex bg-black w-full px-4 py-4 h-min text-secondary font-sans">
      <div className="flex w-full max-w-6xl mx-auto ">
        <button
          type="button"
          className="flex items-center leading-normal hover:text-white"
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <label className="text-base font-bold cursor-pointer">{label}</label>
        </button>
      </div>
    </div>
  );
};
