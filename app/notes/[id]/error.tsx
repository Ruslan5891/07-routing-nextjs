'use client';

interface NoteDetailsErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function NoteDetailsError({ error, retry }: NoteDetailsErrorProps) {
  return (
    <main>
      <p>Could not fetch note details. {error.message}</p>
      <button type="button" onClick={() => retry()}>
        Try again
      </button>
    </main>
  );
}
