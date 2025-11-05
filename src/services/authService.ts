const API_URL = import.meta.env.VITE_BACKEND || "http://localhost:3000";

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_URL}/sign-in`, {
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

<<<<<<< HEAD
export async function registerRequest(name: string, email: string, password: string, photo: string) {
=======
export async function registerRequest(name: string, email: string, image_url: string, password: string, photo: string) {
>>>>>>> 2a902451e2dbbd1f038f6065c66ff544c4de68cb
  const res = await fetch(`${API_URL}/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, photo, image_url }),
  });

  if (!res.ok) {
    if (res.status === 409) throw new Error("EMAIL_ALREADY_EXISTS");
    throw new Error("UNKNOWN_ERROR");
  }

  return res.json();
}
