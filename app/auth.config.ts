import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcript from 'bcryptjs'
import { prisma } from "@/lib"

const credentials = Credentials({
  async authorize(credentials) {
    const result = await prisma.user.findUnique({ where: { email: credentials.email as string } })
    if (!result)
      return null
    if (result && !result.password)
      return null

    let samePassword = false
    if (process.env.NODE_ENV === 'development') {
      samePassword = credentials.password === result.password
    } else {
      samePassword = await bcript.compare(credentials.password as string, result.password as string)
    }

    if(!samePassword)
      return null

    return {
      id: result.id,
      email: result.email,
      name: result.name
    }
  }
})

export default {
  providers: [credentials],
} satisfies NextAuthConfig