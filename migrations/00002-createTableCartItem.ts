// 00002-createTableCartItems.ts
import { Sql } from 'postgres';

export type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
  order_id: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE cart_items (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      product_id integer REFERENCES products(id),
      quantity integer NOT NULL,
      order_id integer REFERENCES orders(id)
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE cart_items
  `;
}
