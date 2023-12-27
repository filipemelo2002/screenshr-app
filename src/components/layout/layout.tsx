import { ReactNode } from "react";
import { Navbar } from "../navbar/navbar";

interface LayoutProps {
  navigateBack: () => void;
  buttonLabel?: string;
  children: ReactNode;
}
export const Layout = ({
  buttonLabel,
  navigateBack,
  children,
}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-black px-4 relative">
      <Navbar className="absolute" onClick={navigateBack} label={buttonLabel} />
      <main className="my-20 md:my-auto mx-auto h-fit w-full max-w-[472px]">
        <h1 className="text-white font-bold text-2xl leading-normal">
          ScreenShr
        </h1>
        {children}
      </main>
    </div>
  );
};
