import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          const json = await res.json();

          if (!res.ok || !json.success) return null;

          return {
            id: String(json.data.id),
            name: json.data.name,
            email: json.data.email,
            role: json.data.role,
            points: json.data.points,
            accessToken: json.token,
            avatar_url: json.data.avatar_url,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name; // ← tambah
        token.email = user.email; // ← tambah
        token.role = user.role;
        token.points = user.points;
        token.accessToken = user.accessToken;
        token.avatar_url = user.avatar_url;
        token.lastRefresh = Date.now();
      }

      // Handle manual update() call dari client
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.email) token.email = session.email;
        if (session.avatar_url) token.avatar_url = session.avatar_url
      }

      // Refresh every 60s
      const now = Date.now();
      const lastRefresh = (token.lastRefresh as number) ?? 0;
      if (now - lastRefresh > 60_000) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${token.id}`,
            { headers: { Authorization: `Bearer ${token.accessToken}` } },
          );
          const json = await res.json();
          if (json.success && json.data) {
            token.name = json.data.name; // ← tambah
            token.email = json.data.email; // ← tambah
            token.points = json.data.points;
            token.role = json.data.role;
            token.avatar_url = json.data.avatar_url;
          }
        } catch {}
        token.lastRefresh = now;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name as string; // ← tambah
      session.user.email = token.email as string; // ← tambah
      session.user.role = token.role;
      session.user.points = token.points;
      session.user.accessToken = token.accessToken;
      session.user.avatar_url = token.avatar_url;
      return session;
    },

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
    maxAge: 7 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
