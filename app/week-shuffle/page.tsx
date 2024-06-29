import { createWeekSchedule } from "@/actions/week-shuffle/createWeekSchedule";

interface WeekShufflePageProps {}

const WeekShufflePage = async ({}: WeekShufflePageProps) => {
  const schedule = await createWeekSchedule();

  return (
    <>
      {schedule.map((day) =>
        day.map(({ assignee, chores }) => chores.map((c) => c.title))
      )}
    </>
  );
};

export default WeekShufflePage;
