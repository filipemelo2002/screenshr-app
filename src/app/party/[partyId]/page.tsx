
interface PartyProps {
  params: {
    partyId: string;
  }
}
export default function Party({params}: PartyProps) {
  return (
    <h1>
      Screenshr, Party Page: {params.partyId}
    </h1>
  )
}