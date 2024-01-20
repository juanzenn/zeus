import Container from "@/components/Container";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { getPoll } from "@/lib/polls";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import React from "react";

const VotesGroup = dynamic(() => import("@/components/VotesGroup"), {
  ssr: false,
});
const AblyContext = dynamic(() => import("@/components/AblyContext"), {
  ssr: false,
});

type Props = {
  params: { pollId: string };
};

export default async function VoteInPollPage({ params }: Props) {
  const poll = await getPoll(params.pollId);

  if (!poll) notFound();

  return (
    <main className="min-h-dvh p-6 md:p-12">
      <Container>
        <TypographyH1>{poll.title}</TypographyH1>
        <TypographyP className="mt-3">{poll.description}</TypographyP>

        <hr className="my-6 border-gray-900" />

        <AblyContext>
          <VotesGroup pollId={params.pollId} options={poll.options} />
        </AblyContext>
      </Container>
    </main>
  );
}
