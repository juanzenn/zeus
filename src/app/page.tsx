import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { getCurrentUser } from "@/lib/user";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { BarChart2 } from "lucide-react";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="mx-6 w-[min(512px,95%)] rounded-md bg-gray-900 px-6 py-4 text-center shadow-md">
        <header className="text-center">
          <TypographyH1>Zeus Polls</TypographyH1>
          <TypographyP>
            Zeus Polls is an open source polling platform. <br />
            Create an account or start with a <strong>quick poll</strong>.
          </TypographyP>
          <hr className="my-4 border-gray-800" />
        </header>

        <section id="buttons" className="mt-6 space-y-4">
          <Button size="large" className="w-full">
            <SiGithub className="mr-2 h-6 w-6" />
            Sign in with GitHub
          </Button>

          <Button variant="outlined" size="large" className="w-full">
            <BarChart2 className="mr-2 h-6 w-6" />
            Create a quick poll
          </Button>
        </section>
      </div>
    </main>
  );
}
