import { apiFetch } from "@/lib/api";

// ── Types ──────────────────────────────────────────────
export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin" | "superadmin";
    points: number;
    avatar_url: string | null;
  };
};

// ── API Calls ──────────────────────────────────────────
export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── Token helpers ──────────────────────────────────────
export function saveToken(token: string) {
  localStorage.setItem("laporaja_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("laporaja_token");
}

export function removeToken() {
  localStorage.removeItem("laporaja_token");
}