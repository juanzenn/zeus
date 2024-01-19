import LoginWithGitHubButton from "@/components/login/login-with-github";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { getCurrentUser } from "@/lib/user";
import { User } from "@prisma/client";
import { BarChartIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="mx-6 w-[min(512px,95%)] rounded-md bg-gray-900 px-6 py-4 text-center shadow-md">
        {user ? <LoggedInContent user={user} /> : <LoginContent />}
      </div>
    </main>
  );
}

function LoginContent() {
  return (
    <>
      <header className="text-center">
        <TypographyH1 data-testid="title">Zeus Polls</TypographyH1>
        <TypographyP data-testid="content">
          Zeus Polls is an open source polling platform. <br />
          Create an account or start with a <strong>quick poll</strong>.
        </TypographyP>
        <hr className="my-4 border-gray-800" />
      </header>

      <section id="buttons" className="mt-6 space-y-4">
        <LoginWithGitHubButton />

        <Button
          data-testid="create-quick-poll"
          variant="outlined"
          size="large"
          className="w-full"
          asChild
        >
          <Link href="/create/quick-poll">
            <BarChartIcon className="mr-2 h-6 w-6" />
            Create a quick poll
          </Link>
        </Button>
      </section>
    </>
  );
}

function LoggedInContent({ user }: { user: User }) {
  return (
    <>
      <TypographyH1 data-testid="title">Logged in</TypographyH1>
      <TypographyP className="mb-6">Welcome, {user.name}</TypographyP>

      <Button asChild size="large">
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </>
  );
}
