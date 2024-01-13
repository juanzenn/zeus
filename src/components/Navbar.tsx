import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <header
      className={cn(
        "mb-8 flex h-14 items-center bg-gray-900 px-6 py-2 shadow-sm",
      )}
    >
      Hola
    </header>
  );
}
