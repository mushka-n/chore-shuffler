import dynamic from "next/dynamic";
import { createWeekSchedule } from "@/actions/week-shuffle/createWeekSchedule";

const LazyPageContent = dynamic(() => import("./content"), {
  loading: () => <h1>Loading</h1>,
});

const WeekShufflePage = async () => {
  const schedule = await createWeekSchedule();

  return (
    <>
      <LazyPageContent schedule={schedule} />
    </>
  );
};

export default WeekShufflePage;
