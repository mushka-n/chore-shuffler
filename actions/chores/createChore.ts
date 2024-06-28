"use server";

import { chores } from "@/database/schema";
import { InsertChore } from "@/database/types";
import { db } from "@/database";
import { revalidatePath } from "next/cache";

export const createChore = async (newChoreData: InsertChore) => {
  const [newChore] = await db.insert(chores).values(newChoreData).returning();

  revalidatePath("/");

  return newChore;
};
