import { cache } from 'react';
import { Product } from '../migrations/00000-createTableProducts';
import { sql } from './connect';

export const getProducts = cache(async () => {
  const products = await sql<Product[]>`
    SELECT * FROM products
  `;
  return products;
});

export const getProductById = cache(async (id: number) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;
  return product;
});

export const deleteProductById = cache(async (id: number) => {
  const [product] = await sql<Product[]>`
    DELETE FROM
      products
    WHERE
      id = ${id}
    RETURNING *
  `;

  return product;
});

export const createProduct = cache(
  async (
    name: string,
    description: string,
    price: number,
    image_url: string,
  ) => {
    const [product] = await sql<Product[]>`
      INSERT INTO products
        (name, description, price, image_url)
      VALUES
        (${name}, ${description}, ${price}, ${image_url})
      RETURNING *
    `;

    return product!;
  },
);

export const updateProductById = cache(
  async (
    id: number,
    name: string,
    description: string,
    price: number,
    image_url: string,
  ) => {
    const [product] = await sql<Product[]>`
      UPDATE
        products
      SET
        name = ${name},
        description = ${description},
        price = ${price},
        image_url = ${image_url}
      WHERE id = ${id}
      RETURNING *
    `;
    return product;
  },
);
