import { Sql } from 'postgres';

export type Order = {
  id: number;
  checkoutId: number;
  date: Date;
  status: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE orders (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      checkout_id integer REFERENCES checkout(id),
      date timestamp NOT NULL,
      status character varying(50) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE orders
  `;
}
