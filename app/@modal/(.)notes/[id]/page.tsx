import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client';

// Перехоплення маршруту /notes/[id]: під час клієнтської навігації нотатка
// відкривається модалкою поверх списку, а сама сторінка лишається на фоні
export default async function NotePreviewPage({ params }: PageProps<'/notes/[id]'>) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
