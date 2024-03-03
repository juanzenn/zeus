"use client";
import { useVoteInPoll } from "@/lib/hooks/polls";
import { createPollVoteId } from "@/lib/ids";
import { PollOption } from "@prisma/client";
import { BarChartIcon } from "@radix-ui/react-icons";
import { useChannel } from "ably/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import GeneralLoadingState from "./GeneralLoadingState";
import VoteButton from "./VoteButton";
import { Button } from "./ui/button";
import { TypographyH2, TypographyP } from "./ui/typography";

type Props = {
  options: PollOption[];
  pollId: string;
};

export default function VotesGroup({ options, pollId }: Props) {
  const router = useRouter();

  const { channel } = useChannel({ channelName: `poll:${pollId}` });

  const { trigger, isMutating } = useVoteInPoll();
  const hasVoted = React.useMemo(() => {
    if (typeof window === "undefined") return false;

    const cache = JSON.parse(localStorage.getItem("votes") || "{}");
    return Object.keys(cache).includes(pollId);
  }, [pollId]);

  async function handleVote(option: PollOption) {
    // Publish the option to the channel
    channel.publish({ name: "vote", data: option });
    await trigger(
      {
        id: createPollVoteId(),
        poll: { connect: { id: option.pollId } },
        option: { connect: { id: option.id } },
      },
      {
        onSuccess: () => {
          const cache = JSON.parse(localStorage.getItem("votes") || "{}");
          localStorage.setItem(
            "votes",
            JSON.stringify({ ...cache, [option.pollId]: option.id }),
          );

          toast.info(
            "Your vote has been registered, redirecting you to results",
          );
          router.push(`/results/${pollId}`);
        },
      },
    );
  }

  React.useEffect(
    function unsubscribe() {
      return () => {
        channel.unsubscribe();
      };
    },
    [channel],
  );

  if (isMutating) {
    return (
      <GeneralLoadingState
        title="Processing your vote"
        description="This may take a few seconds. Please don't close this page."
      />
    );
  }

  if (hasVoted) {
    return (
      <div>
        <TypographyH2>You alredy vote in this poll</TypographyH2>
        <TypographyP>
          You can check the results in the following link.
        </TypographyP>

        <Button variant="outlined" className="mt-4" asChild>
          <Link href={`/results/${pollId}`}>
            <BarChartIcon className="mr-2 h-5 w-5" />
            See results
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {options.map((option) => (
        <VoteButton key={option.id} pollOption={option} onVote={handleVote} />
      ))}
    </section>
  );
}
