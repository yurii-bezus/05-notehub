import axios from 'axios';
import type {
  Note,
  FetchNotesResponse,
  FetchNotesParams,
  CreateNoteData,
  DeleteNoteResponse,
} from '../types/note';

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/notes',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await axiosInstance.get('', { params });
  return response.data;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await axiosInstance.post('', data);
  return response.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
}
