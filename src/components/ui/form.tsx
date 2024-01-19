import React from "react";

type Props = {
  children: React.ReactNode;
};

export function FormGroup({ children }: Props) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
