"use server";

import { db } from "@/database";
import { chores, users } from "@/database/schema";
import { Chore } from "@/database/types";
import { eq } from "drizzle-orm";

export const getChores = async (): Promise<Chore[]> => {
  let fetchedData = await db
    .select({ chore: chores, user: users })
    .from(chores)
    .leftJoin(users, eq(chores.assignee, users.id));

  const data = fetchedData
    .map(({ chore, user }) => ({
      id: chore.id,
      title: chore.title,
      points: chore.points,
      repetitions: chore.repetitions,
      assignee: user,
    }))
    .sort((a, b) => `${a.title}`.localeCompare(b.title));

  return data;
};
