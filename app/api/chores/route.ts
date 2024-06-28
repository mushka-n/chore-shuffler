import { NextResponse } from "next/server";
import { getChores } from "@/actions/chores/getChores";

export const GET = async () => {
  const data = await getChores();
  return NextResponse.json(data);
};
