"use client";
import { Button } from "@/components/button/button";
import { ColorPicker } from "@/components/color-picker/color-picker";
import { Input } from "@/components/input/input";
import { Layout } from "@/components/layout/layout";

export default function JoinParty() {
  return (
    <Layout navigateBack={() => {}}>
      <form className="mt-[41px]">
        <div className="flex flex-col">
          <label className="font-bold font-sans text-sm text-steel-gray mb-3">
            Party code
          </label>
          <div className="flex gap-4 max-w-[300px] text-center font-bold">
            <Input className="text-2xl text-center uppercase" maxLength={1} />
            <Input className="text-2xl text-center uppercase" maxLength={1} />
            <Input className="text-2xl text-center uppercase" maxLength={1} />
            <Input className="text-2xl text-center uppercase" maxLength={1} />
            <Input className="text-2xl text-center uppercase" maxLength={1} />
          </div>
          <div className="mt-4">
            <Input label="Nickname" />
          </div>
          <ColorPicker
            value="bg-pink"
            onChange={() => {}}
            label="Profile color"
            className="mt-4"
          />
          <Button className="mt-4" primary>
            Join party
          </Button>
        </div>
      </form>
    </Layout>
  );
}
