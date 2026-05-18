// lib/getApiUrl.ts
export function getApiUrl() {
  // En el servidor, llamamos directo al backend sin pasar por el rewrite
  if (typeof window === "undefined") {
    return process.env.NODE_ENV === "production"
      ? "https://backend.arrozandinagroup.com/api"
      : "http://localhost:4000/api";
  }
  // En el cliente, el rewrite de next.config.ts maneja el proxy
  return process.env.NEXT_PUBLIC_API_URL ?? "/api";
}