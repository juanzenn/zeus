import { Loader2 } from "lucide-react";
import React from "react";
import GeneralLoadingState from "./GeneralLoadingState";
import { TypographyH2, TypographyP } from "./ui/typography";

export default function CreatingPoll() {
  return (
    <GeneralLoadingState
      title="We're creating your poll"
      description="This may take a few seconds. Please don't close this page."
    />
  );
}
