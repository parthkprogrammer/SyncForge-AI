export type RevisionStatus = 'new' | 'learning' | 'review' | 'mastered';
export type NoteSortOption = 'updated' | 'created' | 'title-asc' | 'title-desc';

export interface Note {
  id: string;
  title: string;
  content: string;
  problemId?: string | null;
  problemTitle?: string | null;
  tags: string[];
  isFavorite: boolean;
  revisionStatus: RevisionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  problemId?: string | null;
  tags: string[];
  revisionStatus: RevisionStatus;
}

export interface NotesFilterState {
  status: RevisionStatus | 'all';
  tag: string | 'all';
  favoriteOnly: boolean;
  linkedProblem: string | 'all';
}
