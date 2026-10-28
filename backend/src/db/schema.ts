import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const booksTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const tsundokuTable= pgTable("tsundoku", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer().notNull().references(() =>booksTable.id),
  userId: integer().notNull().references(() =>usersTable.id),
});