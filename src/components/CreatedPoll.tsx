import { CheckIcon, EyeOpenIcon, Link1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { TypographyH2, TypographyP } from "./ui/typography";

type Props = {
  pollId: string;
};

export default function CreatedPoll({ pollId }: Props) {
  function handleCopyPollLink() {
    toast.info("Copied poll link to clipboard");
    window.navigator.clipboard.writeText(
      `${window.location.origin}/poll/results/${pollId}`,
    );
  }

  return (
    <div>
      <header>
        <TypographyH2 className="flex items-center gap-4">
          Success!
          <CheckIcon className="h-6 w-6 text-green-500" />
        </TypographyH2>
        <TypographyP className="text-gray-500">
          Your poll is ready. Share it with your audience.
        </TypographyP>
      </header>

      <section className="mx-auto mt-6 flex w-fit gap-4">
        <Button size="large" variant="outlined" onClick={handleCopyPollLink}>
          <Link1Icon className="mr-2 h-5 w-5" />
          Copy poll link
        </Button>
        <Button size="large" asChild>
          <Link href={`/poll/results/${pollId}`}>
            <EyeOpenIcon className="mr-2 h-5 w-5" />
            Show poll results
          </Link>
        </Button>
      </section>
    </div>
  );
}
