import { Loader2 } from "lucide-react";
import React from "react";
import { TypographyH2, TypographyP } from "./ui/typography";

type Props = {
  title: string;
  description?: string;
};

export default function GeneralLoadingState({ description, title }: Props) {
  return (
    <div>
      <TypographyH2 className="flex items-center gap-4">
        {title}
        <Loader2 className="animate-spin text-primary" />
      </TypographyH2>
      <TypographyP className="text-gray-500">{description}</TypographyP>
    </div>
  );
}
