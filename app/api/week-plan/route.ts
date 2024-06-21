import { schedule } from "./../../../database/schema";
import { NextResponse } from "next/server";
import { SelectChore, SelectSchedule } from "@/database/types";
import api from "..";

export const GET = async () => {
  let schedule = await api.schedule.GET();
  schedule = await schedule.json();

  return NextResponse.json(schedule);
};
