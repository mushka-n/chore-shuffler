import { db } from "@/database";
import { chores, schedule } from "@/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { InsertSchedule, SelectChore, SelectSchedule } from "@/database/types";

export type ScheduleFullEntry = Omit<SelectSchedule, "choreId"> & {
  chore: SelectChore;
};

export const GET = async () => {
  let data = await db
    .select({ scheduleEntry: schedule, chore: chores })
    .from(schedule)
    .leftJoin(chores, eq(schedule.choreId, chores.id));

  const joinedData: ScheduleFullEntry[] = data.map(
    ({ scheduleEntry, chore }) => ({
      id: scheduleEntry.id,
      weekday: scheduleEntry.weekday,
      repetition: scheduleEntry.repetition,
      chore: chore!,
    })
  );

  return NextResponse.json(joinedData);
};

export const POST = async (body: InsertSchedule) => {
  console.log(body);
  const newScheduleEntry = await db.insert(schedule).values(body).returning();
  return NextResponse.json(newScheduleEntry);
};
