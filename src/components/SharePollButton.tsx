"use client";

import { Share1Icon } from "@radix-ui/react-icons";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function SharePollButton() {
  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Link copied to clipboard");
  }

  return (
    <Button size="large" variant="ghost" onClick={handleShare}>
      <Share1Icon className="h-5 w-5" />
    </Button>
  );
}
