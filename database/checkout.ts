'use server';
import { cache } from 'react';
import { sql } from './connect';

// Type for Checkout
export type Checkout = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  creditCardNumber: string;
  expirationDate: string;
  securityCode: string;
};

export const getCheckouts = cache(async () => {
  const checkouts = await sql<Checkout[]>`
    SELECT * FROM checkout
  `;
  return checkouts;
});

export const getCheckoutById = cache(async (id: number) => {
  const [checkout] = await sql<Checkout[]>`
    SELECT
      *
    FROM
      checkout
    WHERE
      id = ${id}
  `;
  return checkout;
});

export const deleteCheckoutById = cache(async (id: number) => {
  const [checkout] = await sql<Checkout[]>`
    DELETE FROM
      checkout
    WHERE
      id = ${id}
    RETURNING *
  `;
  return checkout;
});

export const createCheckout = cache(
  async (
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    creditCardNumber: string,
    expirationDate: string,
    securityCode: string,
  ) => {
    const [checkout] = await sql<Checkout[]>`
      INSERT INTO checkout
        (first_name, last_name, email, address, city, postal_code, country, credit_card_number, expiration_date, security_code)
      VALUES
        (${firstName}, ${lastName}, ${email}, ${address}, ${city}, ${postalCode}, ${country}, ${creditCardNumber}, ${expirationDate}, ${securityCode})
      RETURNING *
    `;
    return checkout!;
  },
);

export const updateCheckoutById = cache(
  async (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    creditCardNumber: string,
    expirationDate: string,
    securityCode: string,
  ) => {
    const [checkout] = await sql<Checkout[]>`
      UPDATE
        checkout
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        email = ${email},
        address = ${address},
        city = ${city},
        postal_code = ${postalCode},
        country = ${country},
        credit_card_number = ${creditCardNumber},
        expiration_date = ${expirationDate},
        security_code = ${securityCode}
      WHERE id = ${id}
      RETURNING *
    `;
    return checkout;
  },
);
