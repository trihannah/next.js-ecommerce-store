import { Sql } from 'postgres';

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

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE checkout (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name character varying(50) NOT NULL,
      last_name character varying(50) NOT NULL,
      email character varying(100) NOT NULL,
      address character varying(100) NOT NULL,
      city character varying(50) NOT NULL,
      postal_code character varying(20) NOT NULL,
      country character varying(50) NOT NULL,
      credit_card_number character varying(20) NOT NULL,
      expiration_date character varying(10) NOT NULL,
      security_code character varying(5) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE checkout
  `;
}
