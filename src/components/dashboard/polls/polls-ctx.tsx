"use client";

import { Poll } from "@prisma/client";
import React from "react";

type PollsContextProps = {
  filteredPolls: Poll[];
  searchTerm: string;
  searchPolls: (term: string) => void;
};

const PollsContext = React.createContext({} as PollsContextProps);

type PollsProviderContextProps = {
  children: React.ReactNode;
  initialPolls: Poll[];
};

export function PollsProvider({
  initialPolls,
  children,
}: PollsProviderContextProps & { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredPolls, setFilteredPolls] = React.useState(initialPolls);

  function searchPolls(term: string) {
    setSearchTerm(term);
    if (term === "") {
      setFilteredPolls(initialPolls);
      return;
    }

    const filtered = initialPolls.filter((poll) => {
      return poll.title.toLowerCase().includes(term.toLowerCase());
    });

    setFilteredPolls(filtered);
  }

  return (
    <PollsContext.Provider value={{ searchTerm, searchPolls, filteredPolls }}>
      {children}
    </PollsContext.Provider>
  );
}

export function usePolls() {
  const ctx = React.useContext(PollsContext);
  if (!ctx) {
    throw new Error("usePolls must be used within a PollsProvider");
  }

  return ctx;
}
