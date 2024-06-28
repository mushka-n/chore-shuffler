"use server";

import { db } from "@/database";
import { schedule, users } from "@/database/schema";
import { ScheduleFullEntry } from "@/database/types";
import { eq } from "drizzle-orm";

export const getSchedule = async (): Promise<ScheduleFullEntry[]> => {
  let fetchedData = await db
    .select({ scheduleEntry: schedule, user: users })
    .from(schedule)
    .leftJoin(users, eq(schedule.assignee, users.id));

  const data = fetchedData
    .map(({ scheduleEntry, user }) => ({
      id: scheduleEntry.id,
      assignee: user,
      chore: scheduleEntry.chore,
      repetitions: scheduleEntry.repetitions,
    }))
    .sort((a, b) => `${a.chore.title}`.localeCompare(b.chore.title));

  return data;
};
