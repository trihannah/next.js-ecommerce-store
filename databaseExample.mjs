import dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config();

const sql = postgres();

console.log(
  await sql`
  SELECT * FROM products
`,
);
