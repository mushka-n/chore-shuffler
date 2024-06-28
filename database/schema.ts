import { integer, json, pgTable, serial, text } from "drizzle-orm/pg-core";
import { Chore, Repetition } from "./types";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const schedule = pgTable("schedule", {
  id: serial("id").primaryKey(),
  assignee: integer("assignee").references(() => users.id),
  chore: json("chore").$type<Chore>().notNull(),
  repetitions: json("repetitions").$type<Repetition[]>().notNull(),
});
