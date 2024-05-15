import { NextAuthOptions, User, getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const clientId_google = process.env.GOOGLE_CLIENT_ID;
const clientSecret_google = process.env.GOOGLE_CLIENT_SECRET;

const clientId_git = process.env.GITHUB_CLIENT_ID;
const clientSecret_git = process.env.GITHUB_CLIENT_SECRET;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        console.log(credentials);

        // get user from db
        // verify user

        return null;
      },
    }),
    GoogleProvider({
      clientId: clientId_google,
      clientSecret: clientSecret_google,
    }),
    GithubProvider({
      clientId: clientId_git,
      clientSecret: clientSecret_git,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account) {
      }
      return true;
    },
    session: async ({ session, token }) => {
      return session;
    },
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
}
