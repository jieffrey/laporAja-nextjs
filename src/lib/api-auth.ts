import api from "./api"


// == TYPES ==

export type UserRole = "user" | "admin" | "superadmin"

export interface AuthUser {
    token(token: any): unknown
    id: number
    name: string
    email: string
    role: UserRole
    points: number
    created_at: string
    updated_at: string
}

export interface LoginResponse {
    success: boolean
    message: string
    data: AuthUser
    token: string
}

export interface RegisterPayload {
    name: string
    email: string
    password: string
}

// == FETCHING FUNCTIONS ==

// --------------------------------------------------------
// REGISTER
// Dipanggil di: halaman /auth/register (RegisterForm)
// Tidak butuh token
//
// Contoh penggunaan:
//   import { register } from "@/lib/auth.api"
//
//   await register({ name: "Budi", email: "budi@email.com", password: "rahasia123" })
// --------------------------------------------------------
export async function register(payload: RegisterPayload): Promise<AuthUser> {
    const response = await api.post("/auth/register", payload)
    return response.data.data
}

// --------------------------------------------------------
// LOGIN
// Dipanggil di: NextAuth credentials provider (lib/auth.ts)
// Tidak perlu dipanggil langsung di komponen —
// gunakan signIn("credentials", { email, password }) dari next-auth/react
//
// Contoh penggunaan di NextAuth authorize():
//   import { login } from "@/lib/auth.api"
//
//   const data = await login("budi@email.com", "rahasia123")
//   return { id: data.data.id, token: data.token, role: data.data.role, ... }
// --------------------------------------------------------
export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post("/auth/login", { email, password })
    return response.data
}