'use client'

import { createUser } from "@/app/actions/user"
import { useState } from "react"
import { useFormState } from "react-dom"
import { TextInput } from "../TextInput"

function Page() {
  const [ message, action ] = useFormState(createUser, '')
  const [ password, setPassword ] = useState('')
  const [ passwordAgain, setPasswordAgain ] = useState('')

  const samePassword = password === passwordAgain
  const notEmpty = password.trim() !== '' && passwordAgain.trim() !== ''

  return (
    <form className="max-w-md mx-auto" action={action}>
      <TextInput name="name" label="Nome completo" />
      <TextInput name="email" label="Email" />
      <TextInput
        name="password"
        label="Senha"
        type="password"
        onBlur={e => setPassword(e.target.value)}
        />
      <TextInput
        name="password_again"
        label="Confirme sua senha"
        type="password"
        onBlur={e => setPasswordAgain(e.target.value)}
      />
      <p className="text-red-500">{message || (!samePassword && notEmpty && 'as senha não conferem') }</p>
      <button disabled={!samePassword || !notEmpty} type="submit" className="btn w-full">Submit</button>
    </form>
  )
}


export default Page