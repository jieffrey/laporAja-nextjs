import NextAuth from "next-auth";
import type { AuthOptions, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const BASE_URL = "http://localhost:5000";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  points: number;
  avatar_url: string | null;
  accessToken: string;
};

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      role: string;
      points: number;
      avatar_url: string | null;
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    points: number;
    avatar_url: string | null;
    accessToken: string;
  }
}

export const authOptions: AuthOptions 
 = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) throw new Error(data.message || "Login gagal");

          // Return object yang NextAuth simpan di token
          return {
            id: data.data.id,
            name: data.data.name,
            email: data.data.email,
            role: data.data.role,
            points: data.data.points,
            avatar_url: data.data.avatar_url ?? null,
            accessToken: data.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // Simpan data user + token ke JWT session
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.id = authUser.id;
        token.role = authUser.role;
        token.points = authUser.points;
        token.avatar_url = authUser.avatar_url;
        token.accessToken = authUser.accessToken;
      }
      return token;
    },

    // Expose ke client via useSession()
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.points = token.points as number;
        session.user.avatar_url = token.avatar_url as string | null;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },

    // Redirect setelah login berdasarkan role
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 hari
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };