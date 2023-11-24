import { Sql } from 'postgres';

const products = [
  {
    id: 1,
    name: 'Viennese teaset',
    description: '',
    price: 250.0,
    image_url: '/images/Augarten_Teeservice.jpg',
  },
  {
    id: 2,
    name: 'Product2',
    description: '',
    price: 100.0,
    image_url: '/images/Bluemchenservice.jpg',
  },
  {
    id: 3,
    name: 'Product3',
    description: '',
    price: 250.0,
    image_url: '/images/bohemianglasses.jpg',
  },
  {
    id: 4,
    name: 'Product4',
    description: '',
    price: 60.0,
    image_url: '/images/BPlutzer.jpg',
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
      INSERT INTO products
        (name, description, price, image_url)
      VALUES
        (${product.name}, ${product.description}, ${product.price}, ${product.image_url})
    `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products WHERE id = ${product.id}
    `;
  }
}
