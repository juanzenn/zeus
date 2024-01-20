import SidebarLink from "@/components/dashboard/SidebarLink";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/user";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Polls", href: "/dashboard/polls" },
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Archive", href: "/dashboard/archive" },
];

export default async function layout({ children }: Props) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/?error=You must be logged in to view this page.");
  }

  return (
    <main className="container mx-auto h-dvh">
      <div className="flex h-full py-4">
        <aside className="hidden h-full max-w-[300px] flex-1 flex-shrink-0 border-r border-gray-700 px-8 py-6 md:block">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xl font-bold"
            title="Dashboard"
          >
            <Image
              src="/icon-512.png"
              width={32}
              height={32}
              alt="Brand favicon"
            />
            Zeus
          </Link>

          {SIDEBAR_LINKS.map((link) => (
            <SidebarLink {...link} key={link.href} />
          ))}
        </aside>

        <section className="flex-1 px-8 py-6">{children}</section>
      </div>
    </main>
  );
}
