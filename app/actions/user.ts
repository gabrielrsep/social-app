'use server'

import { prisma } from '@/lib'
import { signIn as authSigIn } from '@/app/auth'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { type ZodError, z } from 'zod'
import { revalidateTag } from 'next/cache'

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email('email inválido'),
  password: z.string().min(6, 'a senha deve conter mais de 6 caracteres'),
})

export async function createUser(_prev: any, formData: FormData) {
  const rawPassword = formData.get('password') as string
  const hashedPassword = await hash(rawPassword, 10)

  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: hashedPassword,
  }

  try {
    const parsedData = userSchema.parse(data)
    await prisma.user.create({ data: parsedData })
    redirect('/auth/signin')
  } catch (error: any) {
    if (error.issues) {
      return error.issues
        .map((error: ZodError) => error.message)
        .reduce((prev: string, current: string) => prev + current + '\n')
    } else {
      switch (error.code) {
        case 'P2002':
          return 'email já cadastrado'
      }
    }
  }
}

export async function signIn(_prevState: unknown, formData: FormData) {
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }
  try {
    await authSigIn('credentials', { ...credentials, redirect: false })
    return 'ok'
  } catch (error) {
    return 'error'
  }
}
