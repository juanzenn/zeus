"use client";

import { Prisma } from "@prisma/client";
import { useChannel } from "ably/react";
import React from "react";
import { Bar, BarChart, Pie, PieChart,Tooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChakraProvider, Switch} from "@chakra-ui/react";




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

  const [chartType, setChartType] = React.useState('bar');

  function toggleChartType() {
    setChartType((prev) => (prev === 'bar' ? 'pie' : 'bar'));
  }



  return (
    <div className="h-[50dvh] w-full">
      <div>
        <label htmlFor="chart-toggle" className="mr-2">
          Bar/Pie:
        </label>
        <ChakraProvider>
        <Switch onChange={toggleChartType} checked={chartType === 'pie'}/>
        </ChakraProvider>
        
      </div>
      <ResponsiveContainer width="100%">
        {chartType === 'bar' ? (
          <BarChart data={data}>
            <YAxis hide dataKey="value" />
            <XAxis dataKey="name" />

            <Bar fill="#f59e0b" dataKey="value" />
          </BarChart>
        ) : (
          <PieChart data={data}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#f59e0b" label />
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
