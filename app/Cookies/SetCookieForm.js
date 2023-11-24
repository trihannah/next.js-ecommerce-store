import { useState } from 'react';
import { createCookie } from './actions';

export default function SetCookieForm() {
  const [cookieValue, setCookieValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createCookie(cookieValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={cookieValue}
        onChange={(event) => setCookieValue(event.currentTarget.value)}
      />
      <button>Set Cookie</button>
    </form>
  );
}
