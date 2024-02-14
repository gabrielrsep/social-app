import { unstable_cache } from 'next/cache'
import { prisma } from '.'
import type { Prisma } from '@prisma/client'

const postSelectFields = {
  id: true,
  content: true,
  createdAt: true,
  author: {
    select: {
      id: true,
      name: true,
    },
  },
  _count: {
    select: {
      votes: { where: { type: 'UP' } },
    },
  },
} satisfies Prisma.PostSelect


const PAGE_SIZE = 15

export const getPosts = unstable_cache(
  async (page: number = 0) =>
    prisma.post.findMany({
      select: postSelectFields,
      where: { ref: null },
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
    }),
  ['posts'],
  { revalidate: 30 }
)

export const getPostPages = unstable_cache(
  async () => {
    const total = await prisma.post.count({ where: { ref: null } })
    return Math.ceil(total / PAGE_SIZE)
  },
  ['post_pages'],
  { revalidate: 60 }
)

export const getPost = (id: string) => 
  prisma.post.findUnique({
    select: postSelectFields,
    where: { id }
  })


export const getComments = unstable_cache(
  async (ref: string, take: number = 10) =>
    prisma.post.findMany({
      select: postSelectFields,
      where: { ref },
      orderBy: [{ votes: { _count: 'desc' } }, { createdAt: 'desc' }],
      take,
    }),
  ['comments'],
  { tags: ['comments'] }
)