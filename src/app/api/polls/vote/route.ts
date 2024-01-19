import { captureErrors } from "@/lib/api-router";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import { Prisma } from "@prisma/client";

export function POST(request: Request) {
  return captureErrors(async () => {
    const currentUser = await getCurrentUser();
    const data: Prisma.PollVoteCreateInput = await request.json();

    const vote = await db.pollVote.create({
      data: {
        ...data,
        user: currentUser ? { connect: { id: currentUser.id } } : undefined,
      },
    });

    return Response.json({ saved: true });
  });
}
