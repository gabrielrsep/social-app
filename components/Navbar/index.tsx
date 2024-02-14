
import Link from "next/link"
import { GoBug } from "react-icons/go";
import Links from "./Links";
import SignoutButton from "./SignoutButton";
import { auth } from "@/app/auth";

async function Navbar() {
  const session = await auth()

  return (
    <nav className="flex items-center border-b px-4 h-12 sticky top-0 bg-white dark:bg-slate-800 z-10">
      <Link className="text-black dark:text-white mr-4" href={'/'}><GoBug/></Link>
      <ul className="flex space-x-6">
        <Links/>
      </ul>
      <div className="ml-auto space-x-6">
        
        { session ? (
          <div className="flex items-center gap-x-2">
            <Link className="dark:text-zinc-200" href={'/profile'}>You</Link>
            <SignoutButton/>
          </div>
        ) :
        (
          <Link href={'/auth/signin'} className="nav-btn">Entrar</Link>
        )
      }
      </div>
    </nav>
  )
}


export default Navbar