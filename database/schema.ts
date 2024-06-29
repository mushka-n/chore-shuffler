import { integer, json, pgTable, serial, text } from "drizzle-orm/pg-core";
import { Repetition, Schedule } from "./types";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const chores = pgTable("chores", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  points: integer("points").notNull(),
  repetitions: json("repetitions").$type<Repetition[]>().notNull(),
  assignee: integer("assignee").references(() => users.id),
});

export const shuffle = pgTable("shuffle", {
  id: serial("id").primaryKey(),
  weekIndex: integer("week_index").notNull(),
  schedule: json("schedule").$type<Schedule>().notNull(),
});
