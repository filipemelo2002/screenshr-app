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
    partyCodeInputRefs,
    nicknameInput,
    onJoinParty,
  } = useJoinParty();

  return (
    <Layout navigateBack={navigateBack}>
      <form className="mt-[41px]">
        <div className="flex flex-col">
          <label className="font-bold font-sans text-sm text-steel-gray mb-3">
            Party code
          </label>
          <div className="flex gap-4 max-w-[300px] text-center font-bold">
            <Input
              ref={(ref) => {
                if (ref) {
                  partyCodeInputRefs.current?.push(ref);
                }
              }}
              className="text-2xl text-center uppercase"
              maxLength={1}
            />
            <Input
              ref={(ref) => {
                if (ref) {
                  partyCodeInputRefs.current?.push(ref);
                }
              }}
              className="text-2xl text-center uppercase"
              maxLength={1}
            />
            <Input
              ref={(ref) => {
                if (ref) {
                  partyCodeInputRefs.current?.push(ref);
                }
              }}
              className="text-2xl text-center uppercase"
              maxLength={1}
            />
            <Input
              ref={(ref) => {
                if (ref) {
                  partyCodeInputRefs.current?.push(ref);
                }
              }}
              className="text-2xl text-center uppercase"
              maxLength={1}
            />
            <Input
              ref={(ref) => {
                if (ref) {
                  partyCodeInputRefs.current?.push(ref);
                }
              }}
              className="text-2xl text-center uppercase"
              maxLength={1}
            />
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
