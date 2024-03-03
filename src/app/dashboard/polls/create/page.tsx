import PollForm from "@/components/PollForm";
import Header from "@/components/dashboard/header";
import { redirect } from "next/navigation";
import React from "react";

export default function CreatePollPage() {
  return (
    <>
      <Header title="New Poll" backHref="/dashboard/polls" />

      <section className="my-10">
        <PollForm isQuickPoll={false} />
      </section>
    </>
  );
}
