import React from "react";
import { TypographyH1, TypographyP } from "../ui/typography";

type Props = {
  title: string;
  subtitle?: string;
};

export default function Header({ title, subtitle }: Props) {
  return (
    <header>
      <TypographyH1 className="mb-2">{title}</TypographyH1>
      <TypographyP className="text-gray-300">{subtitle}</TypographyP>
    </header>
  );
}
