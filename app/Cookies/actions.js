export function createCookie(value) {
  document.cookie = `cart=${value}; path=/`;
}

export function getCookie(name, context = {}) {
  const cookie = context.req ? context.req.headers.cookie : document.cookie;
  const cookies = cookie.split('; ').reduce((acc, currentCookie) => {
    const [key, ...value] = currentCookie.split('=');
    acc[key] = value.join('=');
    return acc;
  }, {});

  return cookies[name];
}
