import ScheduleContent from "./content";
import { getSchedule } from "@/actions/schedule/getSchedule";

const SchedulePage = async () => {
  let schedule = await getSchedule();

  return (
    <main className="border-box w-screen max-w-full h-full flex flex-col items-center justify-start bg-black px-20">
      <ScheduleContent data={schedule} />
    </main>
  );
};

export default SchedulePage;
