import { auth } from "@/app/auth"
import { prisma } from "@/lib"
import type { VoteType, Prisma, Vote } from "@prisma/client"
import { errorResponese, noUserResponse } from "@/app/api"

const vote = prisma.vote

export async function POST(req: Request) {
  type ReqBody = { value: VoteType | null, postId: string }

  const body: ReqBody = await req.json()

  const session = await auth()
  const user = session?.user

  if(!user)
   return noUserResponse()

  const data: Prisma.VoteCreateInput = {
    type: body.value,
    author: { connect: { id: user!.id } },
    post: { connect: { id: body.postId } }
  }

  const voteId = {
    authorId: user!.id!,
    postId: body.postId
  }

  const find = await vote.findUnique({
    where: { id: voteId }
  })

  try {
    let upgradedVote: Vote
    if(!find) {
      upgradedVote = await vote.create({ data })
    } else {
      upgradedVote = await vote.delete({ where: { id: voteId } })
    }
    console.log(upgradedVote);
    
    return new Response(undefined, { status: 200 })
  } catch (ex) {
    return errorResponese(ex)
  }
}
