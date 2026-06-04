import axios from "axios"
import { getSession } from "next-auth/react"
import { signOut } from "next-auth/react"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
})

api.interceptors.request.use(async (config) => {
    console.log("INTERCEPTOR JALAN");
  const session = await getSession()
    console.log("SESSION:", session)
  console.log("TOKEN:", session?.user?.accessToken)

  if (session?.user?.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`
  }

  console.log("AUTH:", config.headers.Authorization)
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message?.includes("expired")
    ) {
      await signOut({
        callbackUrl: "/auth/login",
      })
    }

    return Promise.reject(error)
  }
)

export default api