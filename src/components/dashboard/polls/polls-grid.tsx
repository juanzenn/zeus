"use client";

import { usePolls } from "./polls-ctx";

export default function PollsGrid() {
  const { filteredPolls } = usePolls();

  return (
    <section>
      {/* Polls list */}
      {filteredPolls.map((poll) => (
        <div key={poll.id}>{poll.title}</div>
      ))}
    </section>
  );
}
