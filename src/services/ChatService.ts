const BACK_URL = import.meta.env.VITE_BACK_URL;

export const getChatById = async (id: string, token: string) => {
  const response = await fetch(`${BACK_URL}/chat/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const getChatsByUserId = async (token: string) => {
  const response = await fetch(`${BACK_URL}/chat`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const generateChatResponse = async (
  id: string,
  message: string,
  token: string
) => {
  const response = await fetch(`${BACK_URL}/chat/response/${id}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: message,
    }),
  });
  return await response.json();
};

export const createNewChat = async (token) => {
  const response = await fetch(`${BACK_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
