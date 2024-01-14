import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

type TypographyProps<T> = React.HTMLAttributes<T> & {
  children: React.ReactNode;
  asChild?: boolean;
};

export function TypographyH1(props: TypographyProps<HTMLHeadingElement>) {
  const Element = props.asChild ? Slot : "h1";

  return (
    <Element
      {...props}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className,
      )}
    />
  );
}

export function TypographyH2(props: TypographyProps<HTMLHeadingElement>) {
  const Element = props.asChild ? Slot : "h2";

  return (
    <Element
      {...props}
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight",
        props.className,
      )}
    />
  );
}

export function TypographyH3(props: TypographyProps<HTMLHeadingElement>) {
  const Element = props.asChild ? Slot : "h3";

  return (
    <Element
      {...props}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        props.className,
      )}
    />
  );
}

export function TypographyH4(props: TypographyProps<HTMLHeadingElement>) {
  const Element = props.asChild ? Slot : "h4";

  return (
    <Element
      {...props}
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        props.className,
      )}
    />
  );
}

export function TypographyP(props: TypographyProps<HTMLParagraphElement>) {
  const Element = props.asChild ? Slot : "p";

  return (
    <Element
      {...props}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}
    />
  );
}
