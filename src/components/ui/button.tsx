import { cn } from "@/lib/utils";
import { AsChildProps } from "@/types/components";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

type Props = AsChildProps<React.ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button({ asChild = false, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      {...props}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 disabled:pointer-events-none disabled:opacity-50",
        "bg-primary-400 text-black shadow hover:bg-primary-400/90",
        "h-9 px-4 py-2",
        props.className,
      )}
    />
  );
}
