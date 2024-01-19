import { z } from "zod";
import { api } from "./api";
import { endpoints } from "./endpoints";

import type { Poll, Prisma } from "@prisma/client";
import type { MutationArgument } from "./swr";

export async function getPoll(id: string) {
  const { poll } = await api.get<{
    poll:
      | Prisma.PollGetPayload<{
          include: { options: true };
        }>
      | undefined;
  }>(endpoints.polls.single(id));

  return poll;
}

export async function createPoll(
  url: string,
  ctx: MutationArgument<Prisma.PollCreateInput>,
) {
  return api.post<Poll>(url, ctx.arg);
}

export async function voteInPoll(
  url: string,
  ctx: MutationArgument<Prisma.PollVoteCreateInput>,
) {
  return api.post<{ saved: boolean }>(url, ctx.arg);
}

// *** Validations ***

export const pollSchema = z.object({
  title: z.string().trim().min(1, "The title is required.").max(100),
  description: z.string().trim().max(500, "The description is too long."),
  timeLimit: z.coerce.number().max(604800, "The time limit is not valid."),
  password: z.string().max(100, "Password is too long.").optional(),
  options: z
    .array(
      z.object({
        label: z
          .string()
          .trim()
          .min(1, "All options must have a value.")
          .max(100),
      }),
    )
    .refine((options) => {
      const labels = options.map((option) => option.label);
      return new Set(labels).size === labels.length;
    }, "All options must have a unique value."),
});
