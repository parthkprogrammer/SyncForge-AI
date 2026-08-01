import { useState, useEffect, useCallback } from 'react';
import type { Note, NoteFormData, RevisionStatus } from '../types/note.types';
import { initialMockNotes, mockLinkedProblems } from '../data/notesMockData';
import toast from 'react-hot-toast';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const stored = localStorage.getItem('sf_notes');
      return stored ? JSON.parse(stored) : initialMockNotes();
    } catch (e) {
      console.error('Failed to load notes from localStorage', e);
      return initialMockNotes();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sf_notes', JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes to localStorage', e);
    }
  }, [notes]);

  const createNote = useCallback((data: NoteFormData) => {
    const linkedProb = mockLinkedProblems.find((p) => p.id === data.problemId);
    
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: data.title.trim(),
      content: data.content,
      problemId: data.problemId || null,
      problemTitle: linkedProb ? linkedProb.title : null,
      tags: data.tags,
      isFavorite: false,
      revisionStatus: data.revisionStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
    toast.success('Revision note created!');
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, data: NoteFormData) => {
    const linkedProb = mockLinkedProblems.find((p) => p.id === data.problemId);

    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            title: data.title.trim(),
            content: data.content,
            problemId: data.problemId || null,
            problemTitle: linkedProb ? linkedProb.title : null,
            tags: data.tags,
            revisionStatus: data.revisionStatus,
            updatedAt: new Date().toISOString(),
          };
        }
        return n;
      })
    );
    toast.success('Note updated successfully!');
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    toast.success('Note deleted');
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextState = !n.isFavorite;
          toast.success(nextState ? 'Added to favorites' : 'Removed from favorites');
          return {
            ...n,
            isFavorite: nextState,
            updatedAt: new Date().toISOString(),
          };
        }
        return n;
      })
    );
  }, []);

  const updateRevisionStatus = useCallback((id: string, status: RevisionStatus) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          toast.success(`Status updated to: ${status}`);
          return {
            ...n,
            revisionStatus: status,
            updatedAt: new Date().toISOString(),
          };
        }
        return n;
      })
    );
  }, []);

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    updateRevisionStatus,
  };
}
export type UseNotesReturn = ReturnType<typeof useNotes>;
