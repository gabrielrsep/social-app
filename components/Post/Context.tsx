'use client'

import { PropsWithChildren, createContext, useContext } from "react"

const ctx = createContext('')

type Props = PropsWithChildren & { value: string }

export default (props: Props) =>
  <ctx.Provider value={props.value}>
    {props.children}
  </ctx.Provider>


export const usePostId = () => useContext(ctx)