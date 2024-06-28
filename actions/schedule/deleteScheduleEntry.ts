"use server";

import { db } from "@/database";
import { schedule } from "@/database/schema";
import { SelectSchedule } from "@/database/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteScheduleEntry = async (
  scheduleEntryId: SelectSchedule["id"]
) => {
  const [deletedScheduleEntry] = await db
    .delete(schedule)
    .where(eq(schedule.id, scheduleEntryId))
    .returning();

  revalidatePath("/");

  return deletedScheduleEntry;
};
