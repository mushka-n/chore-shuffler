"use server";

import { Chore } from "@/database/types";
import { getChores } from "../chores/getChores";

export const getChoresByWeekIndex = async (
  weekIndex: number
): Promise<Chore[]> => {
  let chores = await getChores();

  let choresByWeekIndex = chores
    .filter((chore) =>
      chore.repetitions.some(({ frequency }) => weekIndex % frequency === 0)
    )
    .map((chore) => ({
      ...chore,
      repetitions: chore.repetitions.filter(
        ({ frequency }) => weekIndex % frequency === 0
      ),
    }));

  return choresByWeekIndex;
};
