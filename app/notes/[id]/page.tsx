import type { Metadata } from 'next';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

export const metadata: Metadata = {
  title: 'Note details | NoteHub',
  description: 'Full information about a single note.',
};

export default async function NoteDetailsPage({ params }: PageProps<'/notes/[id]'>) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
