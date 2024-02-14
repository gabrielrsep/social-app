'use client'

import { useRouter } from "next/navigation"
import { usePostId } from "./Context"
import { type PropsWithChildren } from "react"
import classNames from "classnames"


function Paragrath(props: PropsWithChildren & Props) {
  const router = useRouter()
  const postId = usePostId()
  
  return (
    <p
      className={classNames('text-sm font-normal py-2.5 text-gray-900 dark:text-zinc-200', {'cursor-pointer': props.clickable})}
      onClick={() => props.clickable && router.push(`/posts/${postId}`)}
      >{props.children}</p>
  )
}

export type Props = { clickable?: boolean }

export default Paragrath