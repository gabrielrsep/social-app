import type { PropsWithChildren } from 'react'
import Navbar from '@/components/Navbar'
import Dialog from '@/components/Dialog'
import { deletePost } from '@/app/actions/post'
import { auth } from '@/app/auth'
import RootLayout from '@/app/layout'

export default async function ({ children }: PropsWithChildren) {
  const session = await auth()
  return (
    <RootLayout>
      <Navbar />
      <main className='m-5'>{children}</main>
      {session &&
        <Dialog
          message='Deseja realmente apagar esse post?'
          action={deletePost}
        />
      }
    </RootLayout>
  )
}
