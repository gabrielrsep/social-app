import Post from "@/components/Post"
import { getPost } from "@/lib/db"
import { notFound } from "next/navigation"

type Props = { params: Record<'id', string> }

async function Page({ params }: Props) {
  
  try {
    const post = await getPost(params.id)
    if(!post)
      notFound()

    return <Post {...post} showComments />

  } catch (error) {
    notFound()
  }
}


export default Page