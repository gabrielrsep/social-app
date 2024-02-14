import PostBox from "@/components/PostBox";
import Post from "@/components/Post";
import { getPosts } from "@/lib/db";
import Link from "next/link";

type Props = { searchParams: Partial<Record<'p', string>> }

export default async function Home({ searchParams }: Props) {

  const page = Number(searchParams.p || 0)


  const posts = await getPosts(page)

  return <>
    {page == 0 && <PostBox />}
    <ul className="flex items-center mt-10 flex-col gap-y-6">
      {posts.map(data => (
        <li className="w-[90%]" key={data.id}>
          <Post {...data} clickable />
        </li>
      ))}
    </ul>
    <div className="flex justify-center m-5">
      {page > 0 && <Link href={`/?p=${page - 1}`}>Prev</Link>}
      <Link href={`/?p=${page + 1}`}>Next</Link>
    </div>
  </>
}
