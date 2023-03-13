import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

import { API } from "../../../helpers";
import { CheckUserInterface } from "../../../interfaces";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        token: {
          label: "token",
          type: "text",
        },
      },

      async authorize(credentials) {
        const { token } = credentials as CheckUserInterface;

        const { data } = await axios.patch(
          API.auth.checkUser,
          {},
          { headers: { Authorization: JSON.stringify(token) } }
        );

        if (data) {
          return data;
        } else return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...(await token), ...(await user) };
    },

    async session({ session, token }) {
      session.user = token.user;
      session.token = token.accessToken;
      return await session;
    },
  },

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};

export default NextAuth(authOptions);
