import type { Metadata } from 'next';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { PER_PAGE, fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export const metadata: Metadata = {
  title: 'Notes | NoteHub',
  description: 'Browse, search and create your personal notes.',
};

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ['notes', '', 1],
    queryFn: () => fetchNotes(1, PER_PAGE, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
