'use client'

import { createComment } from "@/app/actions/post"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { usePostId } from "./Context"

function CommentBox() {
  const formRef = useRef<HTMLFormElement>(null)
  const [ state, action ] = useFormState(createComment, null)
  const postId = usePostId()

  useEffect(() => {
    if(state || state === null)
      formRef.current?.reset()
  }, [ state ])

  return (
    <form
      action={action}
      ref={formRef}
      className="flex gap-x-2 items-center">
      <textarea
        className="resize-none flex-1 p-2 mb-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Escreva sua resposta"
        name="content"
      />
      <input type="hidden" name="post_id" defaultValue={postId} />
      <button
        className="btn"
        type="submit"
      >Enviar</button>
    </form>
  )
}


export default CommentBox