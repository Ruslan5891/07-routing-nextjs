import axios from 'axios';
import type { NewNote, Note, NoteTag } from '@/types/note';

export const PER_PAGE = 12;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesOptions {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesQuery {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export async function fetchNotes({
  page = 1,
  perPage = PER_PAGE,
  search = '',
  tag,
}: FetchNotesOptions = {}): Promise<FetchNotesResponse> {
  const params: FetchNotesQuery = { page, perPage };

  if (search.trim() !== '') {
    params.search = search.trim();
  }

  if (tag) {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>('/notes', { params });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await api.post<Note>('/notes', note);

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);

  return response.data;
}
