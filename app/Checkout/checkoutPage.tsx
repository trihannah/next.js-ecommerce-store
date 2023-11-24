'use client';
import React, { useState } from 'react';
import style from './page.module.css';

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    creditCard: '',
    expirationDate: '',
    securityCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = '/Thankyou';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Personal Info Form Fields */}
        <div className={style.container}>
          <div className={style.text}>
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              data-test-id="checkout-first-name"
            />
          </div>
          <div className={style.text}>
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              data-test-id="checkout-last-name"
            />
          </div>
          <div className={style.text}>
            <label htmlFor="email">Email Address:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              data-test-id="checkout-email"
            />
          </div>
        </div>

        {/* Shipping Info Form Fields */}
        <div className={style.container}>
          <div className={style.text}>
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              data-test-id="checkout-address"
            />
          </div>
          <div className={style.text}>
            <label htmlFor="city">City:</label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              data-test-id="checkout-city"
            />
          </div>
          <div className={style.text}>
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              data-test-id="checkout-postal-code"
            />
          </div>
          <div className={style.text}>
            <label htmlFor="country">Country:</label>
            <input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              data-test-id="checkout-country"
            />
          </div>
        </div>

        {/* Payment Info Form Fields */}
        <div className={style.container}>
          <div className={style.text}>
            <label htmlFor="creditCard">Credit Card:</label>
            <input
              id="creditCard"
              name="creditCard"
              value={formData.creditCard}
              onChange={handleInputChange}
              required
              data-test-id="checkout-credit-card"
            />
          </div>
          <div className={style.text}>
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              id="expirationDate"
              name="expirationDate"
              placeholder="MM/YY"
              value={formData.expirationDate}
              onChange={handleInputChange}
              required
              data-test-id="checkout-expiration-date"
            />
          </div>
          <div className={style.text}>
            <label htmlFor="securityCode">Security Code:</label>
            <input
              id="securityCode"
              name="securityCode"
              maxLength={4}
              value={formData.securityCode}
              onChange={handleInputChange}
              required
              data-test-id="checkout-security-code"
            />
          </div>
        </div>

        <div>
          <button data-test-id="checkout-confirm-order">Confirm Order</button>
        </div>
      </form>
    </div>
  );
}
