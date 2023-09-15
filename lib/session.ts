import { getServerSession } from "next-auth/next";
import { AdapterUser } from "next-auth/adapters";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./action";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECERT_KEY!,
    }),
  ],
  jwt: {
      encode: ({ secret, token }) => { 
        console.log({X:`${secret} ${token}`})
        const encodedToken = jsonwebtoken.sign({
          ...token,
          iss:"grafbase",
          exp: Math.floor(Date.now() / 1000)+ 60 * 60
        }, secret)

        return encodedToken;
      },
      decode: async ({ secret, token }) => {
        const decodedToken = jsonwebtoken.verify(token!, secret) as JWT
        return decodedToken;
       }
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      const email = session.user?.email as string;

      // connecting google user with the user created on grafbase 
      try {
        const data = (await getUser(email as string)) as { user?: UserProfile };
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error: any) {
        console.log(error.message);
        return session
      }

    },

    async signIn({ user }: { user?: AdapterUser | User }) {
      try {
        // check if user exsit
        const userExsit = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };
        if (!userExsit.user) {
          createUser(
            user?.email as string,
            user?.name as string,
            user?.image as string
          );
        }

        return true;
      } catch (error: any) {
        console.log(`there is error creating ${error.message}`);
        return false;
      }
    },
  },
};

export const getCurrentUser = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
};
