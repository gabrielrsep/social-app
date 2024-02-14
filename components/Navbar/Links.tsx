'use client'

import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"

type MetaLink = Record<'text' | 'href', string>

function Links() {
  const pathname = usePathname()

  const links: MetaLink[] = []

  return links.map(link =>
    <li key={link.href}>
      <Link
        href={link.href}
        className={classNames('transition-colors dark:hover:text-zinc-500',{
          'dark:text-zinc-200': link.href === pathname,
          'dark:text-gray-600': link.href !== pathname,
        })}
      >{link.text}</Link>
    </li>
  )
}


export default Links