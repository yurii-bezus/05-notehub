import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, deleteNote } from '../../services/noteService';
import type {CreateNoteData } from '../../types/note';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';
import css from './App.module.css';

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => {
      const params = { page: Number(page), perPage: 6, search: search || '' };
      console.log('Fetching notes with params:', params);
      return fetchNotes(params);
    },
    keepPreviousData: true,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCreateNote = async (note: CreateNoteData) => {
    await createNote(note);
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isFetching && <p>Loading...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}

      {data && data.data.length > 0 && (
        <>
          <NoteList items={data.data} onDelete={handleDelete} />
          {data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmitNote={handleCreateNote}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
