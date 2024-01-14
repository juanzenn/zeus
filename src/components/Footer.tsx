import { SiGithub, SiLinkedin, SiX } from "@icons-pack/react-simple-icons";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="space-y-2 bg-gray-900 px-6 py-4 text-gray-500">
      <div className="flex flex-wrap justify-between">
        <p>
          <b>Zeus Polls</b> - create by{" "}
          <a
            href="https://juanalvarez.dev"
            className="hover:text-primary-500 hover:underline"
            target="_blank"
          >
            juanzenn
          </a>
        </p>

        <section className="flex gap-6">
          <SocialmediaIcon href="https://github.com/juanzenn">
            <SiGithub size={24} />
          </SocialmediaIcon>
          <SocialmediaIcon href="https://twitter.com/juanzenweb">
            <SiX size={24} />
          </SocialmediaIcon>
          <SocialmediaIcon href="https://www.linkedin.com/in/juan-alvarez11/">
            <SiLinkedin size={24} />
          </SocialmediaIcon>
        </section>
      </div>
      <p>{new Date().getFullYear()} &copy; All rights reserved</p>
    </div>
  );
}

function SocialmediaIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="transition-all duration-200 hover:scale-105 hover:text-primary-500"
      target="_blank"
    >
      {children}
    </a>
  );
}
