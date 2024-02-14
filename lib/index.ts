import { unstable_cache } from 'next/cache';
import prisma from './prisma-singleton'

export async function getCurrentUserData() {
  const { auth } = await import('@/app/auth')
  const session = await auth()
  if (!session || (session && !session.user)) return null

  return prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    where: { id: session.user!.id },
  })
}

export const TAGS = {
  USER: 'current_user'
}

export const getCurrentUser = unstable_cache(getCurrentUserData, [TAGS.USER], { tags: [TAGS.USER] })

export { prisma }
