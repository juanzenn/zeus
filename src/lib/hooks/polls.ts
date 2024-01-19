import useSWRMutation from "swr/mutation";
import { endpoints } from "../endpoints";
import { createPoll, voteInPoll } from "../polls";

export function useCreatePoll() {
  return useSWRMutation(endpoints.polls.all, createPoll);
}

export function useVoteInPoll() {
  return useSWRMutation(endpoints.pollsVote.vote, voteInPoll);
}
