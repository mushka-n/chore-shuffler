"use server";

import { schedule } from "@/database/schema";
import { InsertSchedule } from "@/database/types";
import { db } from "@/database";
import { revalidatePath } from "next/cache";

export const createScheduleEntry = async (
  newScheduleEntryData: InsertSchedule
) => {
  const [newScheduleEntry] = await db
    .insert(schedule)
    .values(newScheduleEntryData)
    .returning();

  console.log("newScheduleEntry", newScheduleEntry);

  revalidatePath("/");

  return newScheduleEntry;
};
