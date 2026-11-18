import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import express from "express";
import { booksTable } from './db/schema.js';

const app = express();
const db = drizzle(process.env.DATABASE_URL!);
app.get("/", (request, response) => {
  response.send(`hello`);
});

app.get("/books", async (request, response) => {
  const books = await db.select().from(booksTable);
  response.json(books);
});

app.listen(3000);