'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.client.module.css';

export default function NoteDetailsClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <main className={css.main}>
        <p>Loading, please wait...</p>
      </main>
    );
  }

  if (error || !note) {
    return (
      <main className={css.main}>
        <p>Something went wrong.</p>
      </main>
    );
  }

  const createdAt = new Date(note.createdAt).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>Created: {createdAt}</p>
          <button className={css.backBtn} type="button" onClick={() => router.back()}>
            Back
          </button>
        </div>
      </div>
    </main>
  );
}
