'use server';
import { cache } from 'react';
import { CartItem } from '../migrations/00002-createTableCartItem';
import { sql } from './connect';

export const getCartItems = cache(async () => {
  const cartItems = await sql<CartItem[]>`
    SELECT * FROM cart_items
  `;
  return cartItems;
});

export const getCartItemById = cache(async (id: number) => {
  const [cartItem] = await sql<CartItem[]>`
    SELECT
      *
    FROM
      cart_items
    WHERE
      id = ${id}
  `;
  return cartItem;
});

export const deleteCartItemById = cache(async (id: number) => {
  const [cartItem] = await sql<CartItem[]>`
    DELETE FROM
      cart_items
    WHERE
      id = ${id}
    RETURNING *
  `;
  return cartItem;
});

export const createCartItem = cache(
  async (productId: number, quantity: number, orderId: number) => {
    const [cartItem] = await sql<CartItem[]>`
      INSERT INTO cart_items
        (product_id, quantity, order_id)
      VALUES
        (${productId}, ${quantity}, ${orderId})
      RETURNING *
    `;
    return cartItem!;
  },
);

export const updateCartItemById = cache(
  async (id: number, productId: number, quantity: number, orderId: number) => {
    const [cartItem] = await sql<CartItem[]>`
      UPDATE
        cart_items
      SET
        product_id = ${productId},
        quantity = ${quantity},
        order_id = ${orderId}
      WHERE id = ${id}
      RETURNING *
    `;
    return cartItem;
  },
);
