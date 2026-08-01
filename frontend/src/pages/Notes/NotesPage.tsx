import { useState, useEffect, useMemo } from 'react';
import { useNotes } from '../../features/notes/hooks/useNotes';
import { mockLinkedProblems } from '../../features/notes/data/notesMockData';
import { EmptyState } from '../../features/dashboard/components';
import { motion } from 'framer-motion';

// Sub-components
import {
  NotesHeader,
  NotesSearch,
  NotesFilters,
  NotesGrid,
  NoteCard,
  CreateNoteDialog,
  EditNoteDialog,
  DeleteNoteDialog,
  NotesSkeleton,
} from '../../features/notes/components';

// Types
import type { Note, NotesFilterState, NoteSortOption, NoteFormData } from '../../features/notes/types/note.types';

export default function NotesPage() {
  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
  } = useNotes();

  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  const [filters, setFilters] = useState<NotesFilterState>({
    status: 'all',
    tag: 'all',
    favoriteOnly: false,
    linkedProblem: 'all',
  });
  
  const [sortOption, setSortOption] = useState<NoteSortOption>('updated');

  // Dialog visual states
  const [createOpen, setCreateOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  // Simulate initial skeleton load sequence on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // 1. Extract dynamic available tags from notes for search filtering
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet).sort();
  }, [notes]);

  // 2. Extract dynamic linked problems matching notes values
  const availableProblems = useMemo(() => {
    const activeProblemIds = new Set(notes.map((n) => n.problemId).filter(Boolean));
    return mockLinkedProblems.filter((p) => activeProblemIds.has(p.id));
  }, [notes]);

  // 3. Derived Data Filtering Pipeline
  const filteredNotes = useMemo(() => {
    const searchVal = searchText.toLowerCase().trim();
    
    return notes.filter((note) => {
      // Search matching
      if (searchVal) {
        const matchesTitle = note.title.toLowerCase().includes(searchVal);
        const matchesContent = note.content.toLowerCase().includes(searchVal);
        const matchesProblem = note.problemTitle?.toLowerCase().includes(searchVal);
        const matchesTags = note.tags.some((t) => t.toLowerCase().includes(searchVal));
        if (!matchesTitle && !matchesContent && !matchesProblem && !matchesTags) {
          return false;
        }
      }

      // Revision Status matching
      if (filters.status !== 'all' && note.revisionStatus !== filters.status) {
        return false;
      }

      // Tag matching
      if (filters.tag !== 'all' && !note.tags.includes(filters.tag)) {
        return false;
      }

      // Linked Problem matching
      if (filters.linkedProblem !== 'all' && note.problemId !== filters.linkedProblem) {
        return false;
      }

      // Favorites matching
      if (filters.favoriteOnly && !note.isFavorite) {
        return false;
      }

      return true;
    });
  }, [notes, searchText, filters]);

  // 4. Derived Data Sorting Pipeline (Immutable array copy)
  const sortedNotes = useMemo(() => {
    const result = [...filteredNotes];
    
    switch (sortOption) {
      case 'created':
        return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'title-asc':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return result.sort((a, b) => b.title.localeCompare(a.title));
      case 'updated':
      default:
        return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
  }, [filteredNotes, sortOption]);

  const handleClearFilters = () => {
    setSearchText('');
    setFilters({
      status: 'all',
      tag: 'all',
      favoriteOnly: false,
      linkedProblem: 'all',
    });
    setSortOption('updated');
  };

  const handleCreateNote = (data: NoteFormData) => {
    createNote(data);
  };

  const handleUpdateNote = (id: string, data: NoteFormData) => {
    updateNote(id, data);
  };

  const handleDeleteNote = () => {
    if (deletingNote) {
      deleteNote(deletingNote.id);
      setDeletingNote(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
        <NotesHeader notes={notes} onCreateTrigger={() => setCreateOpen(true)} />
        <NotesSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12"
    >
      {/* 1. Header showing stats summaries */}
      <NotesHeader notes={notes} onCreateTrigger={() => setCreateOpen(true)} />

      {/* 2. Controls Toolbar: Search & Filters */}
      {notes.length > 0 && (
        <div className="space-y-4">
          <NotesSearch value={searchText} onChange={setSearchText} />
          
          <NotesFilters
            filters={filters}
            onFilterChange={setFilters}
            sortOption={sortOption}
            onSortChange={setSortOption}
            availableTags={availableTags}
            availableProblems={availableProblems}
            onClearFilters={handleClearFilters}
          />
        </div>
      )}

      {/* 3. Grid Workspace / Empty states */}
      {notes.length === 0 ? (
        <EmptyState
          title="No notes yet"
          description="Create your first revision note to start building your personal coding knowledge base."
          ctaText="Create First Note"
          onCtaClick={() => setCreateOpen(true)}
        />
      ) : sortedNotes.length === 0 ? (
        <EmptyState
          title="No matching notes found"
          description="Try broadening your search query or clear the active tags filter options."
          ctaText="Clear Filters"
          onCtaClick={handleClearFilters}
        />
      ) : (
        <NotesGrid>
          {sortedNotes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <NoteCard
                note={note}
                onEdit={() => setEditingNote(note)}
                onDelete={() => setDeletingNote(note)}
                onToggleFavorite={() => toggleFavorite(note.id)}
              />
            </motion.div>
          ))}
        </NotesGrid>
      )}

      {/* 4. CRUD Overlays Dialogs */}
      <CreateNoteDialog
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateNote}
      />

      {editingNote && (
        <EditNoteDialog
          isOpen={!!editingNote}
          onClose={() => setEditingNote(null)}
          note={editingNote}
          onUpdate={handleUpdateNote}
        />
      )}

      {deletingNote && (
        <DeleteNoteDialog
          isOpen={!!deletingNote}
          onClose={() => setDeletingNote(null)}
          onConfirm={handleDeleteNote}
          noteTitle={deletingNote.title}
        />
      )}

    </motion.div>
  );
}
