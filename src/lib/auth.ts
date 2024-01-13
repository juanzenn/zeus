import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { db } from "./db";
import { getEnvVariable } from "./env";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: getEnvVariable("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVariable("GITHUB_CLIENT_SECRET"),
    }),
  ],
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(db),
  callbacks: {
    session: async ({ session, user }) => {
      if (!session) return session;

      return { ...session, user };
    },
  },
};

export const auth = NextAuth(authOptions);
