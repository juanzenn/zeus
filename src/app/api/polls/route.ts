import { captureErrors } from "@/lib/api-router";
import { db } from "@/lib/db";
import { apiRouterErrors } from "@/lib/errors";
import { getCurrentUser } from "@/lib/user";
import { Prisma } from "@prisma/client";

export function GET() {
  return captureErrors(async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error(apiRouterErrors.unauthorized.message);

    const allPolls = await db.poll.findMany({
      where: { userId: currentUser.id, isArchived: false },
    });

    return Response.json(allPolls);
  });
}

export function POST(request: Request) {
  return captureErrors(async () => {
    const currentUser = await getCurrentUser();
    const data: Prisma.PollCreateInput = await request.json();

    const poll = await db.poll.create({ data });

    if (currentUser) {
      // Connect the poll to the user
      await db.user.update({
        where: { id: currentUser.id },
        data: { polls: { connect: { id: poll.id } } },
      });
    }

    return Response.json(poll);
  });
}
