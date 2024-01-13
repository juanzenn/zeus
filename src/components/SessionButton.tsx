"use client";
import { type Session } from "next-auth";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

type Props = {
  isLoggedIn: boolean;
};

export default function SessionButton({ isLoggedIn }: Props) {
  const label = isLoggedIn ? "Sign Out" : "Sign In";

  function handleOnClick() {
    if (isLoggedIn) {
      signOut();
    } else {
      signIn("github");
    }
  }

  return <Button onClick={handleOnClick}>{label}</Button>;
}
