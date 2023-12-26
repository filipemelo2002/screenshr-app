"use client";
import { Button } from "@/components/button/button";
import { Header } from "@/components/header/header";
import Image from "next/image";
import illustration from "/public/casting-illustration.svg";
import ChevronRight from "@/components/icons/chevron-right";
import { usePageState } from "./page.state";

export default function Home() {
  const { onClickStartParty } = usePageState();

  return (
    <main className="bg-darker-gray flex flex-col min-h-screen">
      <Header />
      <section className="flex align-items-center justify-between max-w-6xl my-14 md:my-auto w-full mx-auto relative">
        <div className="flex flex-col px-4">
          <h1 className="text-white text-4xl md:text-4xl lg:text-6xl font-bold max-w-[498px] leading-normal">
            Quickly share your Screen
          </h1>
          <p className="text-white mt-8 text-lg lg:max-w-[498px]">
            An open-source, free, and easy to use, tool for sharing your screen.
          </p>
          <div className="flex gap-4 mt-12">
            <Button
              primary
              rounded
              className="flex items-center"
              onClick={onClickStartParty}
            >
              Start Party
              <ChevronRight className="ml-3" />
            </Button>
            <Button rounded className="flex items-center">
              Join Party
              <ChevronRight className="ml-3" />
            </Button>
          </div>
        </div>
        <Image
          src={illustration}
          alt="Cast your device"
          className="w-[40%] hidden md:block"
        />
      </section>
    </main>
  );
}
