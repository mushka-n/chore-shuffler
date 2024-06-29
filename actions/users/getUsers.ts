"use server";

import { db } from "@/database";
import { users } from "@/database/schema";
import { User } from "@/database/types";

export const getUsers = async (): Promise<User[]> => {
  let data = await db.select().from(users);
  return data;
};
