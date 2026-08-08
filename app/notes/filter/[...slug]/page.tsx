import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { PER_PAGE, fetchNotes } from '@/lib/api';
import { isNoteTag } from '@/types/note';
import type { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

// slug[0] — це або службове значення all, або назва тега
function resolveTag(slug: string[]): NoteTag | undefined {
  const [value] = slug;

  if (value === 'all') {
    return undefined;
  }

  if (!isNoteTag(value)) {
    notFound();
  }

  return value;
}

export async function generateMetadata({
  params,
}: PageProps<'/notes/filter/[...slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const [value] = slug;
  const title = value === 'all' ? 'All notes | NoteHub' : `${value} notes | NoteHub`;

  return {
    title,
    description:
      value === 'all'
        ? 'Browse, search and create your personal notes.'
        : `Notes filtered by the "${value}" tag.`,
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
      {/* key скидає пошук і пагінацію під час переходу на інший тег */}
      <NotesClient key={tag ?? 'all'} tag={tag} />
    </HydrationBoundary>
  );
}
