import NextAuth from "next-auth/next";
import { authOption } from "@/lib/session";

const authHandler = NextAuth(authOption);
export { authHandler as GET, authHandler as POST };
