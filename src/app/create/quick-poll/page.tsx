import Container from "@/components/Container";
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

      <Container>
        <PollForm isQuickPoll={true} />
      </Container>
    </main>
  );
}
