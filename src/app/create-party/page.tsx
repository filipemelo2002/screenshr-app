"use client";
import { Button } from "@/components/button/button";
import { ColorPicker } from "@/components/color-picker/color-picker";
import { Input } from "@/components/input/input";
import { Navbar } from "@/components/navbar/navbar";
import { useCreateparty } from "./create-party.state";
import { Layout } from "@/components/layout/layout";

export default function CreateParty() {
  const { color, setColor, navigateBack, onCreateParty, nicknameInput } =
    useCreateparty();
  return (
    <Layout navigateBack={navigateBack}>
      <form className="mt-[41px]">
        <Input label="Nickname" ref={nicknameInput} />
        <ColorPicker
          label="Profile color"
          value={color}
          onChange={setColor}
          className="mt-4"
        />
        <Button
          type="button"
          className="w-full mt-3"
          onClick={onCreateParty}
          primary
        >
          <label className="font- font-semibold text-sm leading-normal">
            Create party
          </label>
        </Button>
      </form>
    </Layout>
  );
}
