import { db } from "@/database";
import { chores } from "@/database/schema";

interface ChoreTableProps {}

const ChoreTable = async ({}: ChoreTableProps) => {
  const choresRes = await db.select().from(chores);
  console.log("chores", choresRes);

  return (
    <>
      {choresRes.map((chore) => (
        <div key={chore.id}>{chore.title}</div>
      ))}
    </>
  );
};

export default ChoreTable;
