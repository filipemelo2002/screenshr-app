"use client";
import { Layout } from "@/components/layout/layout";
import { useParty } from "./party.state";
import { PartyControls } from "@/components/party-controls/party-controls";
import { Navbar } from "@/components/navbar/navbar";

interface PartyProps {
  params: {
    partyId: string;
  };
}
export default function Party({ params }: PartyProps) {
  const { navigateBack, isStreaming, nickname, color } = useParty();

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-black px-4 relative">
      <Navbar onClick={navigateBack} label="Exit" />
      <div className="flex relative h-[calc(100vh-56px)] max-h-screen max-w-screen">
        <video
          src="https://www.w3schools.com/tags/movie.mp4"
          className="video-local h-full m-auto"
          muted={isStreaming}
        ></video>
      </div>
      <PartyControls
        name={nickname}
        onChangeStreaming={() => {}}
        onRemoveUser={() => {}}
        color={color}
        partyCode={params.partyId}
        users={[]}
        isStreaming={isStreaming}
        className="absolute bottom-0 left-0"
      />
    </div>
  );
}
