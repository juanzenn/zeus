"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  label: string;
  href: string;
};

export default function SidebarLink({ href, label }: Props) {
  const pathname = usePathname();
  const isActive = React.useMemo(() => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }, [href, pathname]);

  return (
    <Button
      key={href}
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "flex justify-start text-gray-500",
        isActive && "text-gray-900",
      )}
      asChild
    >
      <Link href={href} className="mt-8 block">
        {label}
      </Link>
    </Button>
  );
}
