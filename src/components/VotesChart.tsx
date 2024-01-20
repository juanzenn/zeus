"use client";

import { Prisma } from "@prisma/client";
import { useChannel } from "ably/react";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type PollOption = Prisma.PollOptionGetPayload<{
  include: { votes: true };
}>;

type Props = {
  options: PollOption[];
  pollId: string;
};

export default function VotesChart({ options, pollId }: Props) {
  const [votes, setVotes] = React.useState(() => {
    return options.map((option) => ({
      ...option,
      votes: option.votes.length,
    }));
  });
  useChannel({ channelName: `poll:${pollId}` }, (message) => {
    const data = message.data as PollOption;

    setVotes((prev) => {
      const index = prev.findIndex((option) => option.id === data.id);
      const newVotes = [...prev];
      newVotes[index].votes += 1;
      return newVotes;
    });
  });

  const data = React.useMemo(
    () =>
      votes.map((option) => ({
        name: option.label,
        value: option.votes,
      })),
    [votes],
  );

  return (
    <div className="h-[50dvh] w-full">
      <ResponsiveContainer width="100%">
        <BarChart data={data}>
          <YAxis hide dataKey="value" />
          <XAxis dataKey="name" />

          <Bar fill="#f59e0b" dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
