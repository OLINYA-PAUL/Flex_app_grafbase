import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { Jwt } from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { SessionInterface } from "@/common.types";

export const authOption: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECERT_KEY,
    }),
  ],
  // jwt: {
  //   encode: ({ secret, token }) => {},
  //   decode: async ({ secret, token }) => {},
  // },
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    //@ts-ignore
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // If user is is available login user

        // If there is no user create new user from the dataBase
        return true;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOption)) as SessionInterface;
  return session;
}
