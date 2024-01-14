import { cn } from "@/lib/utils";
import { AsChildProps } from "@/types/components";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const variants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:ring-offset-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-100 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-400 text-gray-900 shadow hover:bg-primary-400/90",
        outlined:
          "bg-transparent text-primary-400 border border-primary-400 hover:bg-primary-400/10",
      },
      size: {
        default: "h-9 px-4 py-2",
        small: "h-7 px-3 py-1",
        large: "h-11 px-5 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type Props = AsChildProps<React.ButtonHTMLAttributes<HTMLButtonElement>> &
  VariantProps<typeof variants>;

export function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: Props) {
  const Element = asChild ? Slot : "button";

  return (
    <Element
      {...props}
      className={cn(variants({ className, size, variant }))}
    />
  );
}
