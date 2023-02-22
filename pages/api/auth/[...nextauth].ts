import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

import { API } from "../../../helpers";
import { LoginInterface } from "../../../interfaces";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usernameOrEmail: {
          label: "UsernameOrEmail",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const { usernameOrEmail, password } = credentials as LoginInterface;

        const { data } = await axios.patch(API.auth.login, {
          usernameOrEmail,
          password,
        });

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
