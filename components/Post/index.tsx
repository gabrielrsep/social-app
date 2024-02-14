import { auth } from "@/app/auth";
import { prisma } from "@/lib";
import { getComments } from "@/lib/db";
import formatTimeAgo from "@/lib/format-time-ago";
import type { Vote } from "@prisma/client";
import Link from "next/link";
import { FaRegCommentAlt as CommentIcon, FaRegTrashAlt as TrashIcon } from "react-icons/fa";
import CommentBox from "./CommentBox";
import PostContext from "./Context";
import LikeButton from "./LikeButton";
import Paragrath, { Props as ParagraphProps } from "./Paragraph";
import RemoveLink from "./RemoveLink";

type Props = Post &  ParagraphProps & {
  showComments?: boolean
}

async function Post(props: Props) {

  const session = await auth()
  const currentUser = session?.user

  const where = { ref: props.id }

  let comments: Post[] = []

  if (props.showComments)
    comments = await getComments(props.id)

  const commentCount = await prisma.post.count({ where })

  const upVoteCount = props._count.votes

  const date = formatTimeAgo(props.createdAt)

  let vote: Vote | null = null
  if (currentUser) {
    vote = await prisma.vote.findUnique({
      where: {
        id: { postId: props.id, authorId: currentUser.id! }
      }
    })
  }


  return (
    <PostContext value={props.id}>
      <div className="rounded-sm dark:hover:bg-gray-500/50 flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 dark:bg-gray-700">
        <div className="relative flex items-center space-x-2">
          <Link href={`/profile/${props.author.id}`} className="text-sm hover:underline font-semibold text-gray-900 dark:text-white">{props.author.name}</Link>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{date}</span>
          <div className="absolute right-0">

            {props.author.id === currentUser?.id &&
              <RemoveLink>
                <div className="text-red-400 text-sm">
                  <TrashIcon />
                </div>
              </RemoveLink>
            }
          </div>
        </div>
        <Paragrath clickable={props.clickable}>
          {props.content}
        </Paragrath>
        <div className="flex items-center gap-x-3 border-t dark:border-gray-500 px-0.5 py-2 dark:text-zinc-200">
          <LikeButton
            initialState={Boolean(vote)}
            total={upVoteCount}
          />
          <div className="flex items-center gap-x-2">
            <CommentIcon />
            <span>{commentCount}</span>
          </div>
        </div>
        {props.showComments && (
          <div className="mt-4">
            <CommentBox />
            {comments.map(data => <Post key={data.id} {...data} clickable />)}
          </div>
        )}
      </div>
    </PostContext>
  )
}


export default Post