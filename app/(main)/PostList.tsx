'use client'

import Post from "@/components/Post"
import { getPosts } from "@/lib/db"

type Props = { page: number }

async function PostList(props: Props) {

  const posts = await getPosts(props.page)

  return (
    <ul className="flex items-center mt-10 flex-col gap-y-6">
      {posts.map(data => 
        <li className="w-[90%]" key={data.id}>
          <Post {...data} clickable />
        </li>
      )}
    </ul>
  )
}


export default PostList