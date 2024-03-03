"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePolls } from "./polls-ctx";

export default function PollsFilters() {
  const { searchTerm, searchPolls } = usePolls();

  return (
    <section className="mt-8 flex items-baseline justify-between">
      <div className="relative max-w-[70%] flex-1">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search polls"
          className="py-6 pl-12 text-lg"
          value={searchTerm}
          onChange={(e) => {
            searchPolls(e.target.value ?? "");
          }}
        />
      </div>

      <Link
        href="/dashboard/polls/create"
        className={cn(buttonVariants(), "flex-shrink-0 gap-4")}
      >
        <PlusIcon /> Create poll
      </Link>
    </section>
  );
}
