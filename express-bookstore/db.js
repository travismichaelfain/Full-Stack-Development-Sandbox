/** Database config for database. */

import pg from "pg";
import { DB_URI } from "./config.js";

const { Client } = pg;

const db = new Client({
  connectionString: DB_URI,
});

await db.connect();

export default db;
