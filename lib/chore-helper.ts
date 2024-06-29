import { Chore, ScheduledChore } from "@/database/types";

export const parseUnscheduledChore = (chore: Chore, weekIndex?: number) => {
  let occurances: ScheduledChore[] = [];
  const { id, title, points, repetitions, assignee } = chore;

  repetitions.forEach(({ weekdays, frequency }) => {
    if (weekIndex && weekIndex % frequency !== 0) return;
    weekdays.forEach((weekday) =>
      occurances.push({ id, title, points, weekday, assignee })
    );
  });

  occurances = occurances.filter(
    (chore1, i, arr) =>
      arr.findIndex((chore2) => chore2.weekday === chore1.weekday) === i
  );

  return occurances;
};
