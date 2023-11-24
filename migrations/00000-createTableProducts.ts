import { Sql } from 'postgres';

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name character varying(50) NOT NULL,
      description text,
      price numeric(10,2) NOT NULL,
      image_url character varying(250)
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products
  `;
}
