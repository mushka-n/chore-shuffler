import { schedule, users } from "./schema";

export type Chore = {
  title: string;
  description?: string;
  points: number;
};

export type Repetition = {
  weekdays: number[];
  frequency: number;
};

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertSchedule = typeof schedule.$inferInsert;
export type SelectSchedule = typeof schedule.$inferSelect;

export type ScheduleFullEntry = Omit<SelectSchedule, "assignee"> & {
  assignee: User | null;
};

export type WeekShuffleItem = {
  id: number;
  assignee: User;
  chore: Chore;
  repetitions: Repetition[];
};

// [
//   {
//     weekday: 1,
//     shuffle: [
//       {
//         assignee: 1,
//         chores: [1, 2, 3],
//       },
//       {
//         assignee: 2,
//         chores: [4, 5, 6],
//       },
//     ],
//   },
//   {
//     weekday: 2,
//     shuffle: [
//       {
//         assignee: 1,
//         chores: [2, 4, 5],
//       },
//       {
//         assignee: 2,
//         chores: [1, 3, 6],
//       },
//     ],
//   },
// ];
