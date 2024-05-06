export type Document = {
  id: string;
  title: string;
  content: string;
};

export interface NotesState {
  items: Document[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedNoteId: number | null,
}