"use server";

import { db } from "@/database";
import { chores } from "@/database/schema";
import { SelectChore } from "@/database/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteChore = async (choreToDeleteId: SelectChore["id"]) => {
  const [deletedChore] = await db
    .delete(chores)
    .where(eq(chores.id, choreToDeleteId))
    .returning();

  revalidatePath("/");

  return deletedChore;
};
