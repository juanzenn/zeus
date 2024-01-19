import PollForm from "@/components/PollForm";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export default function CreateQuickPollPage() {
  return (
    <main className="h-dvh p-12">
      <header className="text-center">
        <TypographyH1 className="mb-3">Create a quick poll</TypographyH1>
        <TypographyP>
          Share with your audience and see the results in real time.
        </TypographyP>
      </header>

      {/* Form */}
      <section className="mx-auto mt-6 max-w-2xl rounded-md border border-gray-900 px-8 py-6 shadow-md">
        <PollForm isQuickPoll={true} />
      </section>
    </main>
  );
}
