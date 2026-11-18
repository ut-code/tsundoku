import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import express from "express";

const app = express();
const db = drizzle(process.env.DATABASE_URL!);
app.get("/", (request, response) => {
  response.send(`hello`);
});
app.listen(3000);