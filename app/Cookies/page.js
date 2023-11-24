import { getCookie } from './actions';
import SetCookieForm from './SetCookieForm';

export default function SetCookiePage() {
  const cookieValue = getCookie('cart');

  return (
    <>
      <div>Cookie value: {cookieValue}</div>
      <SetCookieForm />
    </>
  );
}
