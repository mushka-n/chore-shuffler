import { integer, json, pgTable, serial, text } from "drizzle-orm/pg-core";
import { Repetiton, Weekday } from "./types";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const chores = pgTable("chores", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  assignee: integer("assignee").references(() => users.id),
});

export const schedule = pgTable("schedule", {
  id: serial("id").primaryKey(),
  weekday: text("weekday").$type<Weekday>().notNull(),
  repetition: text("repetition").$type<Repetiton>().notNull(),
  choreId: integer("choreId")
    .notNull()
    .references(() => chores.id),
});
