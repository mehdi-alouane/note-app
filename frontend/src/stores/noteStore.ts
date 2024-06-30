import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Note {
  id: number
  title: string
  content: string
}

export const useNoteStore = defineStore('note', () => {
  const notes = ref<Note[]>([])
  const selectedNoteId = ref<number | null>(null)
  const isEditMode = ref(false)

  async function fetchNotes() {
    try {
      const response = await fetch('http://localhost:3000/api/notes')
      notes.value = await response.json()
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  function selectNote(id: number) {
    selectedNoteId.value = id
    isEditMode.value = false
  }

  function toggleEditMode() {
    isEditMode.value = !isEditMode.value
  }

  async function saveNote(noteId: number, title: string, content: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        throw new Error('Failed to save note')
      }

      const updatedNote = await response.json()
      const index = notes.value.findIndex(note => note.id === noteId)
      if (index !== -1) {
        notes.value[index] = updatedNote
      }

      isEditMode.value = false
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  async function createNote() {
    const newNote = { title: 'New Note', content: '' }
    try {
      const response = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })

      if (!response.ok) {
        throw new Error('Failed to create note')
      }

      const createdNote = await response.json()
      notes.value.push(createdNote)
      selectNote(createdNote.id)  // Select the newly created note
    } catch (error) {
      console.error('Error creating note:', error)
    }
  }

  return { notes, selectedNoteId, isEditMode, fetchNotes, selectNote, toggleEditMode, saveNote, createNote }
})