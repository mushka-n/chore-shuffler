import { NextResponse } from "next/server";
import { getSchedule } from "@/actions/schedule/getSchedule";

export const GET = async () => {
  const data = await getSchedule();
  return NextResponse.json(data);
};
