import Container from "@/components/Container";
import SharePollButton from "@/components/SharePollButton";
import VotesChart from "@/components/VotesChart";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { db } from "@/lib/db";
import { Share1Icon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";
import React from "react";
import { toast } from "sonner";

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

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Link copied to clipboard");
  }

  if (!poll) notFound();

  return (
    <main className="min-h-dvh p-6 md:p-12">
      <Container className="max-w-4xl">
        <div className="flex justify-between">
          <header className="mb-12 flex-1">
            <TypographyH1>{poll.title}</TypographyH1>
            <TypographyP>{poll.description}</TypographyP>
          </header>

          <SharePollButton />
        </div>

        <VotesChart options={options} />
      </Container>
    </main>
  );
}
