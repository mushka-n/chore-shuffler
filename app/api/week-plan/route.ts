import { NextResponse } from "next/server";
import { SelectChore, SelectSchedule } from "@/database/types";

type ScheduleFullEntry = Omit<SelectSchedule, "choreId"> & {
  chore: SelectChore;
};

export const GET = async () => {
  let schedule = await fetch("http://localhost:3000/api/schedule");
  schedule = await schedule.json();

  return NextResponse.json(schedule);
};
