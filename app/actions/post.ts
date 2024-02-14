'use server'

import { getCurrentUser, prisma } from '@/lib'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function createPost(formData: FormData) {
  const user = await getCurrentUser()

  await prisma.post.create({
    data: {
      content: formData.get('content') as string,
      author: {
        connect: { id: user?.id },
      },
    },
  })
  revalidateTag('posts')
}

export async function createComment(_stete: any, formData: FormData) {
  const user = await getCurrentUser()
  const ref = formData.get('post_id') as string

  if (user)
    await prisma.post.create({
      data: {
        content: formData.get('content') as string,
        author: { connect: { id: user.id } },
        ref
      },
    })
  revalidatePath('/posts/' + ref)
  return true
}

export async function deletePost(_prev: boolean | null, formData: FormData) {
  const user = await getCurrentUser()
  if(!user)
    return false

  const postId = formData.get('post_id') as string

  try {
    await prisma.post.deleteMany({
      where: {
        OR: [
          { id: postId },
          { ref: postId }
        ]
      }
    })
    revalidatePath('/')
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}