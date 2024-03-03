import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  EyeOpenIcon,
  Link1Icon,
} from "@radix-ui/react-icons";
import { ListRestartIcon } from "lucide-react";
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
        <TypographyH2 className="flex items-center gap-4">
          Success!
          <CheckIcon className="h-6 w-6 text-green-500" />
          <Button
            size="small"
            variant="ghost"
            className="my-4 ml-8"
            onClick={onRestart}
          >
            <ListRestartIcon className="mr-2 h-5 w-5" />
            Create a new poll
          </Button>
        </TypographyH2>
        <TypographyP className="text-gray-500">
          Your poll is ready. Share it with your audience, go to see live
          results, or create a new poll.
        </TypographyP>
      </header>

      <section className="mx-auto mt-6 flex w-fit gap-4">
        <Button size="large" variant="outlined" onClick={handleCopyPollLink}>
          <Link1Icon className="mr-2 h-5 w-5" />
          Copy vote link
        </Button>

        <Button size="large" asChild>
          <Link href={`/results/${pollId}`}>
            <EyeOpenIcon className="mr-2 h-5 w-5" />
            Go to poll results
          </Link>
        </Button>
      </section>
    </div>
  );
}
