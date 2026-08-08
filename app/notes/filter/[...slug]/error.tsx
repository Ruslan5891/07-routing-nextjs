'use client';

interface NotesErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function NotesError({ error, retry }: NotesErrorProps) {
  return (
    <main>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button type="button" onClick={() => retry()}>
        Try again
      </button>
    </main>
  );
}
