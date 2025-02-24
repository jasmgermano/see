export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function TOKEN_POST(body) {
  return {
    url: `${API_URL}/auth/login`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: "cors"
    },
  };
}

export function USER_GET(token) {
  return {
    url: `${API_URL}/users/me`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: `${API_URL}/auth/register`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
export function USER_GET_BY_USERNAME(username) {
  return {
    url: `${API_URL}/users/profile/${username}`,
    options: {
      method: "GET",
    },
  };
}
