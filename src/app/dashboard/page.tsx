import Header from "@/components/dashboard/header";
import { getCurrentUser } from "@/lib/user";
import React from "react";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header
        title="Dashboard"
        subtitle={`Welcome back, ${currentUser?.name}!`}
      />
    </>
  );
}
