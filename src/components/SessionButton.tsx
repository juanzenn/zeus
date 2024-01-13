"use client";
import { type Session } from "next-auth";

import { signIn, signOut } from "next-auth/react";

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

  return (
    <button
      className="bg-blue-500 text-white m-4 p-2 rounded-sm shadow-sm"
      onClick={handleOnClick}
    >
      {label}
    </button>
  );
}
