import { useRouter } from "next/navigation";

export const usePageState = () => {
  const router = useRouter();
  const onClickStartParty = () => {
    router.push("/create-party");
  };
  return {
    onClickStartParty,
  };
};
