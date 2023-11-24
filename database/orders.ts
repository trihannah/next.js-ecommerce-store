'use server';
import { cache } from 'react';
import { Order } from '../migrations/00004-createTableOrders';
import { sql } from './connect';

export const getOrders = cache(async () => {
  const orders = await sql<Order[]>`
    SELECT * FROM orders
  `;
  return orders;
});

export const getOrderById = cache(async (id: number) => {
  const [order] = await sql<Order[]>`
    SELECT
      *
    FROM
      orders
    WHERE
      id = ${id}
  `;
  return order;
});

export const deleteOrderById = cache(async (id: number) => {
  const [order] = await sql<Order[]>`
    DELETE FROM
      orders
    WHERE
      id = ${id}
    RETURNING *
  `;

  return order;
});

export const createOrder = cache(
  async (checkoutId: number, date: Date, status: string) => {
    const [order] = await sql<Order[]>`
      INSERT INTO orders
        (checkout_id, date, status)
      VALUES
        (${checkoutId}, ${date}, ${status})
      RETURNING *
    `;

    return order!;
  },
);

export const updateOrderById = cache(
  async (id: number, checkoutId: number, date: Date, status: string) => {
    const [order] = await sql<Order[]>`
      UPDATE
        orders
      SET
        checkout_id = ${checkoutId},
        date = ${date},
        status = ${status}
      WHERE id = ${id}
      RETURNING *
    `;
    return order;
  },
);
