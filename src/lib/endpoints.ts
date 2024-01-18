import { getEnvVariable } from "./env";

export const DOMAIN = "http://localhost:3000"; //getEnvVariable("NEXT_PUBLIC_VERCEL_URL");
export const BASE_URL = `${DOMAIN}/api`;

function prefixEndpoint(endpoint: string) {
  return `${BASE_URL}${endpoint}`;
}

export const endpoints = {
  polls: {
    all: prefixEndpoint("/polls"),
    single: (id: string) => prefixEndpoint(`/polls/${id}`),
    create: prefixEndpoint("/polls"),
    update: (id: string) => prefixEndpoint(`/polls/${id}`),
    delete: (id: string) => prefixEndpoint(`/polls/${id}`),
    archive: (id: string) => prefixEndpoint(`/polls/${id}/archive`),
  },
  pollsOption: {
    create: prefixEndpoint("/polls/option"),
    update: (id: string) => prefixEndpoint(`/polls/option/${id}`),
    delete: (id: string) => prefixEndpoint(`/polls/option/${id}`),
  },
  pollsVote: {
    vote: prefixEndpoint("/polls/vote"),
    votes: (pollId: string) => prefixEndpoint(`/polls/vote/${pollId}`),
  },
};
