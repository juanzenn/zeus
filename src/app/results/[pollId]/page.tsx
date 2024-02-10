import Container from "@/components/Container";
import SharePollButton from "@/components/SharePollButton";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { db } from "@/lib/db";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import React from "react";

const AblyContext = dynamic(() => import("@/components/AblyContext"), {
  ssr: false,
});
const VotesChart = dynamic(() => import("@/components/VotesChart"), {
  ssr: false,
});

type Props = {
  params: { pollId: string };
};

export default async function PollResultsPage({ params }: Props) {
  const { pollId } = params;
  const poll = await db.poll.findUnique({
    where: { id: pollId },
  });
  const options = await db.pollOption.findMany({
    where: { pollId },
    include: { votes: true },
  });

  if (!poll) notFound();

  return (
    <main className="min-h-dvh p-6 md:p-12">
      <Container className="max-w-6xl">
        <div className="flex justify-between">
          <header className="mb-12 flex-1">
            <TypographyH1 className="mb-4 line-clamp-2">
              {poll.title}
            </TypographyH1>
            <TypographyP>{poll.description}</TypographyP>
          </header>

          <SharePollButton />
        </div>

        <AblyContext>
          <VotesChart options={options} pollId={pollId} />
        </AblyContext>
      </Container>
    </main>
  );
}
