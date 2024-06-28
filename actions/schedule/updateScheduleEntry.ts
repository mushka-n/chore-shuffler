"use server";

import { schedule } from "@/database/schema";
import { SelectSchedule } from "@/database/types";
import { db } from "@/database";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const updateScheduleEntry = async (
  newScheduleEntryData: SelectSchedule
) => {
  const [newScheduleEntry] = await db
    .update(schedule)
    .set(newScheduleEntryData)
    .where(eq(schedule.id, newScheduleEntryData.id))
    .returning();

  revalidatePath("/");

  return newScheduleEntry;
};
