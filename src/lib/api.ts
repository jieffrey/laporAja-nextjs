import axios from "axios"
import { getSession } from "next-auth/react"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
})

// auto-inject token dari session NextAuth ke setiap request
api.interceptors.request.use(async (config) => {
  const session = await getSession()
  const token = (session?.user as any)?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// normalize error message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? error.message ?? "Terjadi kesalahan"
    return Promise.reject(new Error(message))
  }
)

export default api  // ← ini yang kurang