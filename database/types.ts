import { chores, users } from "./schema";

export type Repetition = {
  weekdays: number[];
  frequency: number;
};

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertChore = typeof chores.$inferInsert;
export type SelectChore = typeof chores.$inferSelect;
export type Chore = Omit<SelectChore, "assignee"> & {
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
