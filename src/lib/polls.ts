import useSWRMutation from "swr/mutation";
import { z } from "zod";
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

// *** Validations ***

export const pollSchema = z.object({
  title: z.string().trim().min(1, "The title is required.").max(100),
  description: z.string().trim().max(500, "The description is too long."),
  timeLimit: z.coerce.number().max(604800, "The time limit is not valid."),
  password: z.string().max(100, "Password is too long.").optional(),
  options: z.array(
    z.object({
      label: z
        .string()
        .trim()
        .min(1, "All options must have a value.")
        .max(100),
    }),
  ),
});
