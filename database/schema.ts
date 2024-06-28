import { integer, json, pgTable, serial, text } from "drizzle-orm/pg-core";
import { Repetition } from "./types";
import { sql } from "drizzle-orm";

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
