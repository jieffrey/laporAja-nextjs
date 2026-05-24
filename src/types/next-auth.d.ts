import NextAuth, {
  DefaultSession
} from "next-auth";

declare module "next-auth" {

  interface Session {

    user: DefaultSession["user"] & {
      id: string;
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