"use client";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

export default function LoginWithGitHubButton() {
  function handleLogin() {
    signIn("github");
  }

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
