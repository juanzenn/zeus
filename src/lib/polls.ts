import useSWRMutation from "swr/mutation";
import { api } from "./api";

import type { Poll, Prisma } from "@prisma/client";
import type { MutationArgument } from "./swr";

async function createPoll(
  url: string,
  ctx: MutationArgument<Prisma.PollCreateInput>,
) {
  return api.post<Poll>(url, ctx.arg);
}

// *** SWR Hooks ***

export function useCreatePoll() {
  return useSWRMutation("/polls", createPoll);
}
