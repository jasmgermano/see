export const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("pAPI_URL", API_URL);

export function TOKEN_POST(body) {
  return {
    url: `${API_URL}/jwt-auth/v1/token`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token) {
  return {
    url: `${API_URL}/api/user`,
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
    url: `${API_URL}/api/user`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
