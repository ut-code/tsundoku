import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import express from "express";
import { booksTable } from './db/schema.js';
import { eq } from 'drizzle-orm';
const app = express();
const db = drizzle(process.env.DATABASE_URL!);
app.use(express.json());
app.get("/", (request, response) => {
  response.send(`hello`);
});

app.get("/books", async (request, response) => {
  const books = await db.select().from(booksTable);
  response.json(books);
});
app.get("/books/:id", async (request, response) => {
  const books = await db.select().from(booksTable).where(eq(booksTable.id, Number(request.params.id)));
  response.json(books);
});
app.post("/books", async (request, response) => {
  const createdBook = await db.insert(booksTable).values({ title: request.body.title }).returning();
  response.json(createdBook);
});

app.delete("/books/:id", async (request, response) => {
  const deletedBook = await db.delete(booksTable).where(eq(booksTable.id, Number(request.params.id))).returning();
  response.json(deletedBook);
});

app.listen(3000);