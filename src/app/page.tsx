"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <>
      <Button onClick={() => toast.success("Hello world!")}>
        <span>Success</span>
      </Button>
      <Button onClick={() => toast.error("Hello world!")}>
        <span>Error</span>
      </Button>
      <Button onClick={() => toast.warning("Hello world!")}>
        <span>Warning</span>
      </Button>
      <Button onClick={() => toast.info("Hello world!")}>
        <span>Info</span>
      </Button>
    </>
  );
}
