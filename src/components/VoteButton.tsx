import { PollOption } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";

type Props = {
  pollOption: PollOption;
  onVote: (pollOption: PollOption) => void;
};

export default function VoteButton({ pollOption, onVote }: Props) {
  return (
    <Button
      onClick={() => onVote(pollOption)}
      variant="outlined"
      className="w-full justify-start"
    >
      {pollOption.label}
    </Button>
  );
}
