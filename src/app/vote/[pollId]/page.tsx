import Container from "@/components/Container";
import GeneralLoadingState from "@/components/GeneralLoadingState";
import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";
import { getPoll } from "@/lib/polls";
import { HomeIcon } from "@radix-ui/react-icons";
import { DateTime } from "luxon";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const VotesGroup = dynamic(() => import("@/components/VotesGroup"), {
  ssr: false,
});
const AblyContext = dynamic(() => import("@/components/AblyContext"), {
  ssr: false,
  loading() {
    return <GeneralLoadingState title="Loading responses..." />;
  },
});

type Props = {
  params: { pollId: string };
};

export default async function VoteInPollPage({ params }: Props) {
  const poll = await getPoll(params.pollId);

  if (!poll) notFound();

  const currentDate = DateTime.now();
  const expirationDate = DateTime.fromJSDate(new Date(poll.createdAt)).plus({
    seconds: poll.timeLimit,
  });

  const isExpired = true;

  return (
    <main className="min-h-dvh p-6 md:p-12">
      <Container>
        <TypographyH1>{poll.title}</TypographyH1>
        <TypographyP className="mt-3 text-xl text-gray-600">
          {poll.description}
        </TypographyP>
        <TypographyP className="mt-1 text-sm text-gray-700">
          {isExpired
            ? "Poll has expired"
            : "Expires " + expirationDate.toRelative()}
        </TypographyP>

        <hr className="my-6 border-gray-800" />

        {isExpired ? (
          <section>
            <TypographyH2>This poll has expired</TypographyH2>
            <TypographyP className="mt-3">
              You can no longer vote in it. Sorry!
            </TypographyP>

            <Button asChild className="mt-4">
              <Link href="/">
                <HomeIcon className="mr-2 h-5 w-5" />
                <span>Go back home</span>
              </Link>
            </Button>
          </section>
        ) : (
          <AblyContext>
            <VotesGroup pollId={params.pollId} options={poll.options} />
          </AblyContext>
        )}
      </Container>
    </main>
  );
}
