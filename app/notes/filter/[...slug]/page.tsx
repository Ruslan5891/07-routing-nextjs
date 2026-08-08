import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { PER_PAGE, fetchNotes } from '@/lib/api';
import { slugToTag } from '@/types/note';
import type { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

function resolveTag(slug: string[]): NoteTag | undefined {
  const [value] = slug;

  if (value.toLowerCase() === 'all') {
    return undefined;
  }

  const tag = slugToTag(value);

  if (!tag) {
    notFound();
  }

  return tag;
}

export async function generateMetadata({
  params,
}: PageProps<'/notes/filter/[...slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const tag = resolveTag(slug);

  return {
    title: tag ? `${tag} notes | NoteHub` : 'All notes | NoteHub',
    description: tag
      ? `Notes filtered by the "${tag}" tag.`
      : 'Browse, search and create your personal notes.',
  };
}

export default async function FilteredNotesPage({ params }: PageProps<'/notes/filter/[...slug]'>) {
  const { slug } = await params;
  const tag = resolveTag(slug);

  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ['notes', { search: '', page: 1, tag: tag ?? null }],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? 'all'} tag={tag} />
    </HydrationBoundary>
  );
}
