import SessionButton from "@/components/SessionButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>

      <SessionButton session={session} />
    </main>
  );
}
