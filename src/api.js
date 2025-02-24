export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function TOKEN_POST(body) {
  console.log("body", body);
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

export function USER_PUT(token, body) {
  return {
    url: `${API_URL}/auth/update`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  };
}

export function PROFILE_PICTURE_PUT(id, formData, token) {
  return {
    url: `${API_URL}/users/${id}/profile-picture`,
    options: {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
}

export function PROFILE_COVER_PUT(id, formData, token) {
  return {
    url: `${API_URL}/users/${id}/profile-cover`,
    options: {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
}
