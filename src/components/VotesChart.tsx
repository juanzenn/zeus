"use client";

import { Poll, Prisma } from "@prisma/client";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PollOption = Prisma.PollOptionGetPayload<{
  include: { votes: true };
}>;

type Props = {
  options: PollOption[];
};

// TODO: The fetch should be done in the client side
// We need to add the "websockets" with Ably integration
// For now we need to add a "refresh" button

export default function VotesChart({ options }: Props) {
  const data = options.map((option) => ({
    name: option.label,
    value: option.votes.length,
  }));

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
