// Бекенд не віддає перелік тегів окремим маршрутом, тому тримаємо його в коді
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

export function isNoteTag(value: string): value is NoteTag {
  return (NOTE_TAGS as readonly string[]).includes(value);
}
