import SidebarLink from "@/components/dashboard/SidebarLink";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/user";
import { Archive, Home, PieChart, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SIDEBAR_LINKS = [
  { Icon: Home, label: "Dashboard", href: "/dashboard" },
  { Icon: PieChart, label: "Polls", href: "/dashboard/polls" },
  { Icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { Icon: Archive, label: "Archive", href: "/dashboard/archive" },
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

          {SIDEBAR_LINKS.map(({ Icon, ...rest }) => (
            <SidebarLink {...rest} key={rest.href}>
              <Icon className="mr-4" strokeWidth={2} size={18} />
            </SidebarLink>
          ))}
        </aside>

        <section className="flex-1 px-8 py-6">{children}</section>
      </div>
    </main>
  );
}
