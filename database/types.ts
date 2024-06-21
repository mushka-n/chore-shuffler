import { chores, schedule, users } from "./schema";

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertChore = typeof chores.$inferInsert;
export type SelectChore = typeof chores.$inferSelect;

export type InsertSchedule = typeof schedule.$inferInsert;
export type SelectSchedule = typeof schedule.$inferSelect;
