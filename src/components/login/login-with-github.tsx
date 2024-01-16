"use client";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function LoginWithGitHubButton() {
  const params = useSearchParams();

  async function handleLogin() {
    toast.info("Being redirected to GitHub...");
    await signIn("github", {
      callbackUrl: "/dashboard",
    });
  }

  React.useEffect(() => {
    if (params.has("error")) {
      toast.error("An error occurred while signing in.", {
        id: "github-error",
      });
    }
  }, [params]);

  return (
    <Button
      data-testid="github-button"
      onClick={handleLogin}
      size="large"
      className="w-full"
    >
      <SiGithub className="mr-2 h-6 w-6" />
      Sign in with GitHub
    </Button>
  );
}
