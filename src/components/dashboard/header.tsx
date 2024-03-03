import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { TypographyH1, TypographyP } from "../ui/typography";

type Props = {
  title: string;
  backHref?: string;
  subtitle?: string;
};

export default function Header({ title, subtitle, backHref }: Props) {
  return (
    <header>
      {backHref?.length && (
        <section className="mb-12">
          <Link
            href={backHref}
            className={cn(buttonVariants({ variant: "outlined" }), "mb-6")}
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Return
          </Link>

          <div className="mb-4 border-b border-gray-600" />
        </section>
      )}

      <TypographyH1 className="mb-2">{title}</TypographyH1>
      <TypographyP className="text-gray-300">{subtitle}</TypographyP>
    </header>
  );
}
