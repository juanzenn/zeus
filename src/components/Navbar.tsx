import { getCurrentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SessionButton from "./SessionButton";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header
      className={cn("flex h-14 items-center bg-gray-900 px-6 py-2 shadow-sm")}
    >
      <Link href="/">
        <Image alt="" src="/icon-512.png" width={40} height={40} />
      </Link>

      <div className="ml-auto w-fit">
        <SessionButton isLoggedIn={Boolean(user)} />
      </div>
    </header>
  );
}
