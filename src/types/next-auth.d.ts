import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    name: string
    email: string
    role: string
    points: number
    accessToken: string
    avatar_url?: string
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string
      name: string
      email: string
      role: string
      points: number
      accessToken: string
      avatar_url?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    points: number
    accessToken: string
    avatar_url?: string
  }
}