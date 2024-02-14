'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { usePostId } from "./Context"
import { PropsWithChildren } from "react"

function RemoveLink(props: PropsWithChildren) {
  const pathname = usePathname()
  const postId = usePostId()
  const modalURL = `${pathname}?modal-for=${postId}`
  
  return (
    <Link href={modalURL} title="Apagar Postagem">
      {props.children}
    </Link>
  )
}


export default RemoveLink