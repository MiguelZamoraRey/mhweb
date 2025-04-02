const BACK_URL = import.meta.env.VITE_BACK_URL;

export const login = async (email: string, pass: string) => {
  const response = await fetch(`${BACK_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  });
  return await response.json();
};

export const register = async (email: string, pass: string) => {
  const response = await fetch(`${BACK_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
    },
    body: JSON.stringify({
      email: email,
      password: pass,
      userName: email.substring(0, email.indexOf('@')),
    }),
  });
  return await response.json();
};

export const getMe = async (token: string) => {
  const response = await fetch(`${BACK_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
