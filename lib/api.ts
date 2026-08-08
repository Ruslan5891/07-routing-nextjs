import axios from 'axios';
import type { NewNote, Note } from '../types/note';

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const PER_PAGE = 12;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export async function fetchNotes(
  page: number,
  perPage: number,
  search: string,
): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = { page, perPage };
  if (search.trim() !== '') {
    params.search = search.trim();
  }

  const response = await axios.get<FetchNotesResponse>('/notes', { params });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);

  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await axios.post<Note>('/notes', note);

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`);

  return response.data;
}
