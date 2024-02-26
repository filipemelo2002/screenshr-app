"use client";
import { Button } from "@/components/button/button";
import { ColorPicker } from "@/components/color-picker/color-picker";
import { Input } from "@/components/input/input";
import { Layout } from "@/components/layout/layout";
import { useJoinParty } from "./join-party.state";

export default function JoinParty() {
  const {
    navigateBack,
    color,
    setColor,
    partyCodeInputRef,
    nicknameInput,
    onJoinParty,
  } = useJoinParty();

  return (
    <Layout navigateBack={navigateBack}>
      <form className="mt-[41px]">
        <div className="flex flex-col">
          <div className="max-w-[300px] font-bold">
            <Input label="Party Code" ref={partyCodeInputRef} />
          </div>
          <div className="mt-4">
            <Input label="Nickname" ref={nicknameInput} />
          </div>
          <ColorPicker
            value={color}
            onChange={setColor}
            label="Profile color"
            className="mt-4"
          />
          <Button className="mt-4" type="button" onClick={onJoinParty} primary>
            Join party
          </Button>
        </div>
      </form>
    </Layout>
  );
}
