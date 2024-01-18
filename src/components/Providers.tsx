"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "sonner";
import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          onSuccess: () => {
            startTransition(() => {
              router.refresh();
            });
          },
          onError: (err) => {
            if (process.env.NODE_ENV === "development") {
              console.error(err);
            }

            toast.error(err.message);

            startTransition(() => {
              router.refresh();
            });
          },
        }}
      >
        {children}
      </SWRConfig>

      <Toaster richColors position="bottom-left" theme="dark" />
    </>
  );
}
