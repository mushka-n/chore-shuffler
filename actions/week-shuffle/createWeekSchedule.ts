"use server";

import { ScheduledChore, Schedule } from "@/database/types";
import { getUsers } from "../users/getUsers";
import { distributeChoresBetweenSubsets } from "@/lib/shuffle-helper";
import { shuffleArray } from "@/lib/array-utils";
import { getScheduledChoresByWeekIndex } from "./getScheduledChoresByWeekIndex";

const WEEK_INDEX = 6;

export const createWeekSchedule = async (): Promise<Schedule> => {
  const chores = shuffleArray(await getScheduledChoresByWeekIndex(WEEK_INDEX));
  const users = await getUsers();

  const unassignedChores = chores.filter((chore) => !chore.assignee);
  const assignedChores: ScheduledChore[][] = users.map(({ id: userId }) =>
    chores.filter((chore) => chore.assignee?.id === userId)
  );
  const distributedChores = distributeChoresBetweenSubsets(
    unassignedChores,
    assignedChores
  );

  const schedule: Schedule = [1, 2, 3, 4, 5, 6, 7].map(() =>
    users.map((assignee) => ({ assignee, chores: [] }))
  );
  distributedChores.forEach((chores, assigneeIndex) => {
    chores.forEach((chore) =>
      schedule[chore.weekday - 1][assigneeIndex].chores.push(chore)
    );
  });

  return schedule;
};
