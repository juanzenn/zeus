"use client";
import { type Session } from "next-auth";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

type Props = {
  session: Session | null;
};

export default function SessionButton({ session }: Props) {
  const isLoggedIn = Boolean(session);
  const label = isLoggedIn ? "Log Out" : "Log In";

  function handleOnClick() {
    if (isLoggedIn) {
      signOut();
    } else {
      signIn("github");
    }
  }

  return <Button onClick={handleOnClick}>{label}</Button>;
}
