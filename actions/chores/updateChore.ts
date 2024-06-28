"use server";

import { chores } from "@/database/schema";
import { SelectChore } from "@/database/types";
import { db } from "@/database";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const updateChore = async (updatedChoreData: SelectChore) => {
  const [updatedChore] = await db
    .update(chores)
    .set(updatedChoreData)
    .where(eq(chores.id, updatedChoreData.id))
    .returning();

  revalidatePath("/");

  return updatedChore;
};
