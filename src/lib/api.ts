import axios from "axios"
import { getSession } from "next-auth/react"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
})

api.interceptors.request.use(async (config) => {
  // In server runtime use getServerSession dynamically to avoid importing
  // a client-only hook on the server bundle. In browser use getSession.
  try {
    if (typeof window === "undefined") {
      const { getServerSession } = await import("next-auth")
      const { authOptions } = await import("@/app/api/auth/[...nextauth]/route")
      const session = await getServerSession(authOptions)
      if (session?.user?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`
      }
    } else {
      const session = await getSession()
      if (session?.user?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`
      }
    }
  } catch (e) {
    // ignore session retrieval errors; request will proceed without auth header
  }

  return config
})

api.interceptors.response.use((res) => res, (error) => Promise.reject(error))

export default api