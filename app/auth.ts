import { prisma } from "@/lib"
import NextAuth from "next-auth"

import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    session({ token, session }) {
      if(token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/signin'
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})