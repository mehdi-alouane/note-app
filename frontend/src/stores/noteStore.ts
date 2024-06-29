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
  }

  return { notes, selectedNoteId, fetchNotes, selectNote }
})