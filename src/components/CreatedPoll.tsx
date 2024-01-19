import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  EyeOpenIcon,
  Link1Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { TypographyH2, TypographyP } from "./ui/typography";

type Props = {
  pollId: string;
  onRestart: () => void;
};

export default function CreatedPoll({ pollId, onRestart }: Props) {
  function handleCopyPollLink() {
    toast.info("Copied poll link to clipboard");
    window.navigator.clipboard.writeText(
      `${window.location.origin}/vote/${pollId}`,
    );
  }

  return (
    <div>
      <header>
        <Button
          size="small"
          variant="ghost"
          className="-ml-4 mb-4"
          onClick={onRestart}
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Return
        </Button>

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
          Vote link
        </Button>

        <Button size="large" asChild>
          <Link href={`/results/${pollId}`}>
            <EyeOpenIcon className="mr-2 h-5 w-5" />
            Show poll results
          </Link>
        </Button>
      </section>
    </div>
  );
}
