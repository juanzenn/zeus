import React from "react";

type Props = {
  params: { pollId: string };
};

export default function PollResultsPage({ params }: Props) {
  return <main className="h-dvh">PollResultsPage: {params.pollId}</main>;
}
