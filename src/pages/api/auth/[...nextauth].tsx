import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import Providers from "next-auth/providers";

import api from "../../../services/api";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: process.env.MONGODB_URI,
  callbacks: {
    async signIn(user, account, profile) {
      const { login, id, avatar_url, name } = profile as {
        login: string;
        id: number;
        avatar_url: string;
        name: string;
      };

      const profilePayload = {
        githubId: id,
        login: login,
        name: name,
        image: avatar_url,
      };

      await api.post("/api/profile", profilePayload);

      return true;
    },
    async session(session, token) {
      const githubId = Number(token.image.split("/")[4].split("?")[0]); // need remove it
      session.githubId = githubId
      return session;
    }
  },
};

export default (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, options);
