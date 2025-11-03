export type LoginOutput = { token: string; user: { id: string; email: string } };

export async function loginRequest(email: string, password: string): Promise<LoginOutput> {
  const res = await fetch(import.meta.env.VITE_API_URL + "/api/auth/login", {
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

export async function registerRequest(name: string, email: string, password: string) {
  const res = await fetch(import.meta.env.VITE_API_URL + "/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    if (res.status === 409) throw new Error("EMAIL_ALREADY_EXISTS");
    throw new Error("UNKNOWN_ERROR");
  }

  return res.json();
}
