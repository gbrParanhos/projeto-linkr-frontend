import axios, { type AxiosRequestHeaders } from "axios";

function pickBaseURL() {
  const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;
  const raw = env.VITE_API_URL ?? env.VITE_BACKEND ?? "";
  const trimmed = raw?.replace(/\/+$/, "") ?? "";
  return trimmed || undefined;
}

const api = axios.create({ baseURL: pickBaseURL() });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    const current = config.headers;
    if (current && typeof (current as any).set === "function") {
      (current as any).set("Authorization", `Bearer ${token}`);
    } else {
      const headers: AxiosRequestHeaders = (current ?? {}) as AxiosRequestHeaders;
      headers["Authorization"] = `Bearer ${token}`;
      config.headers = headers;
    }
  }
  return config;
});

export default api;
