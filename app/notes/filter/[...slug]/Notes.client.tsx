'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import EmptyState from '@/components/EmptyState/EmptyState';
import { PER_PAGE, fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import css from './Notes.client.module.css';

const DEBOUNCE_DELAY = 500;

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', { search, page, tag: tag ?? null }],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search, tag }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const applySearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, DEBOUNCE_DELAY);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    applySearch(value);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination pageCount={totalPages} currentPage={page} onPageChange={handlePageChange} />
        )}
        <button className={css.button} type="button" onClick={handleOpenModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && notes.length === 0 && <EmptyState search={search} />}
      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
      <Toaster position="top-center" />
    </div>
  );
}
