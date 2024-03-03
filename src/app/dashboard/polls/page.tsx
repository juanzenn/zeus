import Header from "@/components/dashboard/header";
import PollsFilters from "@/components/dashboard/polls/filters";
import { PollsProvider } from "@/components/dashboard/polls/polls-ctx";
import PollsGrid from "@/components/dashboard/polls/polls-grid";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function PollsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const initialPolls = await db.poll.findMany({
    where: {
      isArchived: false,
      userId: currentUser.id,
    },
  });

  return (
    <PollsProvider initialPolls={initialPolls}>
      <Header
        title="Polls"
        subtitle={`
          Create polls and share them with your friends or audience.
          Watch in real-time as the results come in.
        `}
      />

      <PollsFilters />
      <PollsGrid />
    </PollsProvider>
  );
}
