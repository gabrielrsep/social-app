'use client'

import { useState } from "react";
import { FaRegHeart as HeartOutlineIcon } from "react-icons/fa";
import { FaHeart as HeartIcon } from "react-icons/fa6";
import { usePostId } from "./Context";

type Props = {
  initialState: boolean
  total: number
}

function LikeButton({ total, initialState }: Props) {
  const [ status, setStatus ] = useState<boolean>(initialState)
  const [ likes, setLikes ] = useState(total)
  const postId = usePostId()

  const onClick = async () => {
    const nextStatus = !status
    setStatus(nextStatus)

    const reqProps: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        value: nextStatus ? 'UP' : null,
        postId
      })
    }
    
    setLikes(likes => nextStatus ? likes + 1 : likes - 1)

    const res = await fetch('/api/like', reqProps)
    if(!res.ok) {
      console.error('like api error');
    }
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-x-2"
    >
      {status ? <HeartIcon /> : <HeartOutlineIcon />}
      {likes !== 0 && <span>{likes}</span>}
    </button>
  )
}

export default LikeButton