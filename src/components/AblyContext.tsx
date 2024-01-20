"use client";
import React from "react";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";

// **NOTE**: This component should always be loaded dynamically, without SSR.

export default function AblyContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new Ably.Realtime.Promise({
    authUrl: "/api/ably/token",
  });

  return <AblyProvider client={client}>{children}</AblyProvider>;
}
