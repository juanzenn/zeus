"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  isLoggedIn: boolean;
};

export default function SessionButton({ isLoggedIn }: Props) {
  const label = isLoggedIn ? "Sign Out" : "Sign In";

  if (!isLoggedIn) {
    return (
      <Button asChild>
        <Link href="/">{label}</Link>
      </Button>
    );
  }

  return (
    <Button data-testid="signOutButton" onClick={() => signOut()}>
      {label}
    </Button>
  );
}
