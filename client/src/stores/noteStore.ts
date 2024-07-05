import { defineStore } from 'pinia';
import api from '../api';
import { Note } from '../types';

interface ShareableNote extends Note {
  shareableUrl?: string;
}

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: [] as ShareableNote[],
    currentNote: null as ShareableNote | null,
  }),
  actions: {
    async fetchNotes() {
      try {
        const response = await api.get<Note[]>('notes');
        this.notes = response.data;
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    },
    async fetchNoteById(id: number | undefined) {
      try {
        const response = await api.get<Note>(`notes/${id}`);
        this.currentNote = response.data;
        return response.data;
      } catch (error) {
        console.error('Error fetching note by id:', error);
        throw error;
      }
    },

    async createNote() {
      try {
        const response = await api.post<Note>('notes', {
          title: 'New Note',
          content: ''
        });

        this.notes.push(response.data);
        // Return the newly created note's ID
        return response.data.id;
      } catch (error) {
        console.error('Error creating note:', error);
        throw error;
      }
    },

    async updateNote(id: number | undefined, data: Partial<Note>) {
      try {
        const response = await api.put<Note>(`/notes/${id}`, data);
        this.currentNote = response.data;
        const index = this.notes.findIndex(note => note.id === id);
        if (index !== -1) {
          this.notes[index] = response.data;
        }
        return response.data;
      } catch (error) {
        console.error('Error updating note:', error);
        throw error;
      }
    },

    async deleteNote(id: number) {
      try {
        await api.delete(`/notes/${id}`);
        this.notes = this.notes.filter(note => note.id !== id);
      } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
      }
    },

    async shareNote(id: number) {
      try {
        const response = await api.post<{ shareableUrl: string }>(`/notes/${id}/share`);
        const shareableUrl = response.data.shareableUrl;

        // Update the note in the store with the shareable URL
        const noteIndex = this.notes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
          this.notes[noteIndex] = { ...this.notes[noteIndex], shareableUrl };
        }

        // If the current note is the one being shared, update it as well
        if (this.currentNote && this.currentNote.id === id) {
          this.currentNote = { ...this.currentNote, shareableUrl };
        }

        return shareableUrl;
      } catch (error) {
        console.error('Error sharing note:', error);
        throw error;
      }
    }
  }
});