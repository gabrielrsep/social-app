import { signOut } from "@/app/auth"

function SignoutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button
        title="Sair"
        type="submit"
        className="bg-red-400 dark:bg-red-800 nav-btn"
      >Sair</button>
    </form>
  )
}


export default SignoutButton