'use client'

import { TextInput } from "../TextInput"
import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"


import { GoAlert as AlertIcon } from "react-icons/go";
import { signIn } from "@/app/actions/user"
import { useFormState } from "react-dom"
import SubmitButton from "./SubmitButton"


function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [ formState, action ] = useFormState(signIn, null)

  useEffect(() => {
    if(formState === 'ok')
      router.replace(callbackUrl)
  }, [ formState ])

  return (
    <form action={action} className="max-w-md mx-auto mt-40">
      <h1 className="text-3xl mb-5">Bem vindo!</h1>
      <TextInput
        label="Email"
        name="email"
      />
      <TextInput
        label="Senha"
        name="password"
        type="password"
      />
      {formState === 'error' && (
        <div className="flex gap-x-2 items-center p-2 mb-4 text-red-800 bg-red-50 dark:bg-transparent dark:text-red-400" role="alert">
          <div className="text-xl">
            <AlertIcon />
          </div>
          <span>
            Credenciais incorretas
          </span>
        </div>
      )}

      <SubmitButton/>

      <div className="flex mt-3 items-center">
        <hr className="flex-1" />
        <span className="mx-5">ou</span>
        <hr className="flex-1" />
      </div>

      <div className="mt-2 flex justify-center w-full">
        <Link className="btn_outline" href={'/auth/signup'}>Criar conta</Link>
      </div>
    </form>
  )
}


export default Page