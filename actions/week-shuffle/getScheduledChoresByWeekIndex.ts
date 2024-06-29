"use server";

import { ScheduledChore } from "@/database/types";
import { parseUnscheduledChore } from "@/lib/chore-helper";
import { getChoresByWeekIndex } from "./getChoresByWeekIndex";

export const getScheduledChoresByWeekIndex = async (
  weekIndex: number
): Promise<ScheduledChore[]> => {
  let chores = await getChoresByWeekIndex(weekIndex);

  let scheduledChores: ScheduledChore[] = [];
  chores.forEach((chore) => {
    scheduledChores = [
      ...scheduledChores,
      ...parseUnscheduledChore(chore, weekIndex),
    ];
  });

  return scheduledChores;
};
