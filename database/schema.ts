import { integer, json, pgTable, serial, text } from "drizzle-orm/pg-core";

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
  weekday: integer("weekday").notNull(),
  repetition: integer("repetition").notNull(),
  choreId: integer("choreId")
    .notNull()
    .references(() => chores.id),
});
