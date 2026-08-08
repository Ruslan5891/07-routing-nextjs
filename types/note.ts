export const NOTE_TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

export type NoteTag = (typeof NOTE_TAGS)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export function tagToSlug(tag: NoteTag): string {
  return tag.toLowerCase();
}

export function slugToTag(slug: string): NoteTag | undefined {
  return NOTE_TAGS.find(tag => tag.toLowerCase() === slug.toLowerCase());
}
