export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface DeleteNoteResponse {
  id: string;
}
