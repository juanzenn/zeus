import { captureErrors } from "@/lib/api-router";
import { db } from "@/lib/db";
import { apiRouterErrors } from "@/lib/errors";
import { getCurrentUser } from "@/lib/user";

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
