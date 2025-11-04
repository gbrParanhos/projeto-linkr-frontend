const API_URL = import.meta.env.VITE_BACKEND || "http://localhost:3000";

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("INVALID_CREDENTIALS");
    throw new Error("UNKNOWN_ERROR");
  }

  return res.json();
}

export async function registerRequest(name: string, email: string, password: string, photo: string) {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, photo }),
  });

  if (!res.ok) {
    if (res.status === 409) throw new Error("EMAIL_ALREADY_EXISTS");
    throw new Error("UNKNOWN_ERROR");
  }

  return res.json();
}
