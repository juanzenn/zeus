import Header from "@/components/dashboard/header";
import React from "react";

export default function ArchivePage() {
  return (
    <>
      <Header
        title="Archive"
        subtitle={`
          A poll just finished? You can find it here.
          The archive is a place where you can find all your old polls.
        `}
      />
    </>
  );
}
