"use client";
import { Button } from "@/components/button/button";
import { ColorPicker } from "@/components/color-picker/color-picker";
import { Input } from "@/components/input/input";
import { Navbar } from "@/components/navbar/navbar";
import { useCreateparty } from "./create-party.state";

export default function CreateParty() {
  const { color, setColor, navigateBack } = useCreateparty();
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-black px-4 relative">
      <Navbar className="absolute" onClick={navigateBack} />
      <main className="my-20 md:my-auto mx-auto h-fit w-full max-w-[472px]">
        <h1 className="text-white font-bold text-2xl leading-normal">
          ScreenShr
        </h1>
        <form>
          <Input label="Nickname" />
          <ColorPicker
            label="Profile Color"
            value={color}
            onChange={setColor}
            className="mt-4"
          />
          <Button className="w-full mt-3" primary>
            <label className="font- font-semibold text-sm leading-normal">
              Create party
            </label>
          </Button>
        </form>
      </main>
    </div>
  );
}
