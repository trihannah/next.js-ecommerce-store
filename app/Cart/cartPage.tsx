'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProductById } from '../../database/products';
import style from './page.module.css';

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

function getCookie(name: string): string | undefined {
  const cookie = document.cookie;
  const cookies = cookie
    .split('; ')
    .reduce<Record<string, string>>((acc, currentCookie) => {
      const [key, ...value] = currentCookie.split('=');
      acc[key.trim()] = value.join('=');
      return acc;
    }, {});
  return cookies[name];
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/`;
}

export default function CartPage() {
  const cartCookie = getCookie('cart');
  console.log('Cart Cookie:', cartCookie);
  let initialCartFromCookie: Record<string, number> = {};
  try {
    initialCartFromCookie = cartCookie ? JSON.parse(cartCookie) : {};
  } catch (error) {
    console.error('Error parsing cart cookie:', error);
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const productIds = Object.keys(initialCartFromCookie);
    Promise.all(productIds.map((id) => getProductById(Number(id))))
      .then((products) => {
        const newCartItems = products.map((product) => ({
          id: product.id.toString(),
          name: product.name,
          price:
            typeof product.price === 'string'
              ? parseFloat(product.price)
              : product.price,
          quantity: initialCartFromCookie[product.id.toString()],
        }));
        setCartItems(newCartItems);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, []);

  useEffect(() => {
    const cookieData = cartItems.reduce((acc, item) => {
      acc[item.id] = { quantity: item.quantity };
      return acc;
    }, {});
    setCookie('cart', JSON.stringify(cookieData));
  }, [cartItems]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className={style.Content}>
      <h1>Cart</h1>

      {/* list of items */}
      <div className="cartItemsList">
        {cartItems.map((item) => (
          <div
            key={`item-${item.id}`}
            className="cartItem"
            data-test-id={`cart-product-${item.id}`}
          >
            <div>{item.name}</div>
            <div data-test-id={`cart-product-quantity-${item.id}`}>
              {item.quantity}
            </div>
            <div>{item.price * item.quantity}</div>
            <button
              onClick={() =>
                setCartItems((prev) => prev.filter((ci) => ci.id !== item.id))
              }
              data-test-id={`cart-product-remove-${item.id}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <p data-test-id="cart-total">${total.toFixed(2)}</p>

      <Link href="/Checkout" data-test-id="cart-checkout">
        Checkout
      </Link>
    </div>
  );
}
