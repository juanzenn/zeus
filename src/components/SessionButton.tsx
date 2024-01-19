"use client";
import { UpdateIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type Props = {
  isLoggedIn: boolean;
};

export default function SessionButton({ isLoggedIn }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const label = isLoggedIn ? "Sign Out" : "Sign In";

  if (!isLoggedIn) {
    return (
      <Button asChild>
        <Link href="/">{label}</Link>
      </Button>
    );
  }

  async function handleSignOut() {
    toast.info("Successfully signed out.");
    setIsLoading(true);
    await signOut({ redirect: false });
    setIsLoading(false);

    router.push("/");
    router.refresh();
  }

  return (
    <Button
      data-testid="signOutButton"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading && <UpdateIcon className="mr-2 h-3 w-3 animate-spin" />}
      {label}
    </Button>
  );
}
