import { Loader2 } from "lucide-react";
import React from "react";
import { TypographyH2, TypographyP } from "./ui/typography";

export default function CreatingPoll() {
  return (
    <div>
      <TypographyH2 className="flex items-center gap-4">
        We&apos;re creating your poll
        <Loader2 className="animate-spin text-primary" />
      </TypographyH2>
      <TypographyP className="text-gray-500">
        This may take a few seconds. Please don&apos;t close this page.
      </TypographyP>
    </div>
  );
}
