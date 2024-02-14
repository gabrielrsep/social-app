'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { AiOutlineExclamationCircle as Exclamation } from "react-icons/ai";

type Props = {
  message: string
  action: (prevState: boolean | null, data: FormData) => Promise<boolean>
}

function Dialog({ message, action }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const postId = searchParams.get('modal-for')
  const [ sent, formAction ] = useFormState(action, null)
  const route = useRouter()
  
  const closeDialog = useCallback(() => {
    ref.current?.close()
    route.replace(pathname)
  }, [route, pathname])

  useEffect(() => {
    if (postId)
      ref.current?.showModal()
}, [postId])

  useEffect(() => {
    if(sent) {
      closeDialog()
    }
  }, [sent, closeDialog])


  return <>
    <dialog
      className="fixed top-0 rounded-md p-5"
      ref={ref}
    >
      <form
        action={formAction}
      >
        <div className="flex text-gray-500 dark:text-gray-400 items-center flex-col pt-4">
          <div className="text-7xl">
            <Exclamation />
          </div>
          <h3 className="mb-5 text-lg font-normal">{message}</h3>
          <menu className="space-x-3">
            <input type="hidden" name="post_id" value={postId || ''} />
            <button
              className="btn_shape text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium text-sm text-center"
              type="submit"
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              autoFocus
              onClick={closeDialog}
              className="btn_shape focus:outline-none focus:ring-2"
            >Cancel</button>
          </menu>
        </div>
      </form>
    </dialog>
  </>
}

export default Dialog