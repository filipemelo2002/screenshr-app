import Image from "next/image";
import githubIcon from "../../../public/github.svg";

export const Header = () => {
  return (
    <div className="flex bg-black w-full px-4 py-4 h-min">
      <div className="flex w-full max-w-6xl mx-auto justify-between">
        <h1 className="font-sans text-white font-bold font-size text-2xl">
          ScreenShr
        </h1>
        <Image src={githubIcon} alt="Github" className="text-white" />
      </div>
    </div>
  );
};
