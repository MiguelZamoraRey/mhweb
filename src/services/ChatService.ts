const BACK_URL = import.meta.env.VITE_BACK_URL;

export const getChatById = async (id: string) => {
  const response = await fetch(`${BACK_URL}/chat/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
    },
  });
  return await response.json();
};

export const generateChatResponse = async (id: string, message: string) => {
  const response = await fetch(`${BACK_URL}/chat/response/${id}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
    },
    body: JSON.stringify({
      message: message,
    }),
  });
  return await response.json();
};

/*
export const createNewGuest = async (email, code): Promise<IApiResponse> => {
  const response = await fetch(`${BACK_URL}/guest`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
    },
    body: JSON.stringify({
      email: email,
      code: code,
    }),
  });

  return response.json();
};

export const updateGuestData = async (id, guestData): Promise<IApiResponse> => {
  const response = await fetch(`${BACK_URL}/guest/update/${id}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allowed-Origin': '*',
    },
    body: JSON.stringify(guestData),
  });
  return response.json();
};
*/
