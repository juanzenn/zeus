import React from "react";

type Props = {
  params: { pollId: string };
};

export default function PollResultsPage({ params }: Props) {
  return (
    <main className="min-h-dvh p-6 md:p-12">
      PollResultsPage: {params.pollId}
    </main>
  );
}
