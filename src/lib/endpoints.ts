import { getEnvVariable } from "./env";

export const DOMAIN = getEnvVariable("NEXT_PUBLIC_VERCEL_URL");
export const BASE_URL = `${DOMAIN}/api`;

export const endpoints = {
  polls: {
    all: "/polls",
    single: (id: string) => `/polls/${id}`,
    create: "/polls",
    update: (id: string) => `/polls/${id}`,
    delete: (id: string) => `/polls/${id}`,
    archive: (id: string) => `/polls/${id}/archive`,
  },
  pollsOption: {
    create: "/polls/option",
    update: (id: string) => `/polls/option/${id}`,
    delete: (id: string) => `/polls/option/${id}`,
  },
  pollsVote: {
    vote: "/polls/vote",
    votes: (pollId: string) => `/polls/vote/${pollId}`,
  },
};
