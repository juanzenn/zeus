import { cn } from "@/lib/utils";
import React from "react";

import type { ClassNameValue } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: ClassNameValue;
};

export default function Container({ children, className }: Props) {
  return (
    <section
      className={cn(
        "mx-auto mt-6 max-w-2xl rounded-md border border-gray-800 px-8 py-6 shadow-md",
        className,
      )}
    >
      {children}
    </section>
  );
}
