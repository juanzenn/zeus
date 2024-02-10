"use client";

import { Prisma } from "@prisma/client";
import { BarChartIcon, PieChartIcon } from "@radix-ui/react-icons";
import { useChannel } from "ably/react";
import React from "react";
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type PollOption = Prisma.PollOptionGetPayload<{
  include: { votes: true };
}>;

type Props = {
  options: PollOption[];
  pollId: string;
};

const mockData = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

export default function VotesChart({ options, pollId }: Props) {
  const [chartType, setChartType] = React.useState<"bar" | "pie">("bar");
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

  function handleChartTypeChange(value: "bar" | "pie") {
    return () => setChartType(value);
  }

  return (
    <Tabs value={chartType}>
      <TabsContent value="pie" className="h-[50dvh] w-full">
        <ResponsiveContainer width="100%">
          <PieChart>
            <Pie
              stroke={colors.gray[950]}
              data={mockData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="90%"
              fill="#f59e0b"
            />
          </PieChart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="bar" className="h-[50dvh] w-full">
        <ResponsiveContainer width="100%">
          <BarChart data={mockData}>
            <YAxis hide dataKey="value" />
            <XAxis dataKey="name" />

            <Bar fill="#f59e0b" dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>

      <div className="mt-8 grid w-full justify-center">
        <TabsList>
          <TabsTrigger
            className="w-40"
            value="bar"
            onClick={handleChartTypeChange("bar")}
          >
            <BarChartIcon />
            Bar
          </TabsTrigger>
          <TabsTrigger
            className="w-40"
            value="pie"
            onClick={handleChartTypeChange("pie")}
          >
            <PieChartIcon />
            Pie
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
}
