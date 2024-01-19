import { nanoid } from "nanoid";

export function createPollId() {
  return `poll_${nanoid(16)}`;
}

export function createPollOptionId() {
  return `popt_${nanoid(16)}`;
}

export function createPollVoteId() {
  return `pvote_${nanoid(16)}`;
}
