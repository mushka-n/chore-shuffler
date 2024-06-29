import ChoresContent from "./content";
import { getChores } from "@/actions/chores/getChores";

const ChoresPage = async () => {
  let chores = await getChores();

  return (
    <main className="border-box w-screen max-w-full h-full flex flex-col items-center justify-start bg-black px-20">
      <ChoresContent data={chores} />
    </main>
  );
};

export default ChoresPage;
