import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({
              email:    credentials.email,
              password: credentials.password,
            }),
          })

          const json = await res.json()

          if (!res.ok || !json.success) return null

          return {
            id:          String(json.data.id),
            name:        json.data.name,
            email:       json.data.email,
            role:        json.data.role,
            points:      json.data.points,
            accessToken: json.token,
          }
        } catch {
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id          = user.id
        token.role        = user.role
        token.points      = user.points
        token.accessToken = user.accessToken
      }
      return token
    },

    async session({ session, token }) {
      session.user.id          = token.id
      session.user.role        = token.role
      session.user.points      = token.points
      session.user.accessToken = token.accessToken
      return session
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url

      return baseUrl
    },
  },

  pages: {
    signIn: "/auth/login",
    error:  "/auth/login",
  },

  session: {
    strategy: "jwt",
    maxAge:   7 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }