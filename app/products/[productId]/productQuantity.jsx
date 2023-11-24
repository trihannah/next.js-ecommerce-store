'use client';
import jsCookies from 'js-cookie';
import React, { useState } from 'react';

export default function ProductQuantity({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      const existingCartStr = jsCookies.get('cart');
      const existingCart = existingCartStr ? JSON.parse(existingCartStr) : {};

      if (existingCart[product.id]) {
        existingCart[product.id].quantity += quantity;
      } else {
        existingCart[product.id] = {
          quantity: quantity,
        };
      }
      jsCookies.set('cart', JSON.stringify(existingCart));

      console.log(`Added ${quantity} ${product.name}(s) to the cart`);

      setQuantity(1);
    }
  };

  return (
    <div>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
        data-test-id="product-quantity"
      />
      <button onClick={handleAddToCart} data-test-id="product-add-to-cart">
        Add to Cart
      </button>
    </div>
  );
}
