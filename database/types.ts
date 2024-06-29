import { chores, shuffle, users } from "./schema";

// Users

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Chores

export type InsertChore = typeof chores.$inferInsert;
export type SelectChore = typeof chores.$inferSelect;

export type Repetition = { weekdays: number[]; frequency: number };

export type Chore = Omit<SelectChore, "assignee"> & { assignee: User | null };
export type ScheduledChore = Omit<Chore, "repetitions"> & {
  weekday: number;
};

// Shuffle

export type InserShuffle = typeof shuffle.$inferInsert;
export type Shuffle = typeof shuffle.$inferSelect;

export type Schedule = {
  assignee: User;
  chores: Omit<ScheduledChore, "assignee">[];
}[][];
