import { db } from "@/database";
import { chores } from "@/database/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  let data = await db.select().from(chores);

  return NextResponse.json(data);
};
