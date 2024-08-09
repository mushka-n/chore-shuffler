import dynamic from "next/dynamic";
import { getChores } from "@/actions/chores/getChores";

const LazyPageContent = dynamic(() => import("./content"), {
  loading: () => <h1>Loading</h1>,
});

const ChoresPage = async () => {
  let chores = await getChores();

  return (
    <main className="border-box w-screen max-w-full h-full flex flex-col items-center justify-start bg-black p-8">
      <LazyPageContent data={chores} />
    </main>
  );
};

export default ChoresPage;
