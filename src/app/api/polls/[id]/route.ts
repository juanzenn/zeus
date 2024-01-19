import { captureErrors } from "@/lib/api-router";
import { db } from "@/lib/db";
import { apiRouterErrors } from "@/lib/errors";

export function GET(_: Request, ctx: { params: { id: string } }) {
  return captureErrors(async () => {
    const poll = await db.poll.findUnique({
      where: { id: ctx.params.id },
      include: {
        options: true,
      },
    });

    return Response.json({ poll });
  });
}
