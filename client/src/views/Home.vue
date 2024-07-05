<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-blue-600/80">Notes:</h1>
      <button @click="handleNewNote" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm">
        New Note
      </button>
    </div>
    <transition-group name="note-list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="note in noteStore.notes" :key="note.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="h-5"></div>
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold text-gray-600">{{ note.title }}</h3>
            <div class="flex space-x-2">
              <button @click="handleShareNote(note.id)" class="text-blue-500 hover:text-blue-600" :disabled="note.isSharing">
                <svg v-if="!note.isSharing" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
              <button @click="handleDeleteNote(note.id)" class="text-red-500 hover:text-red-600" :disabled="note.isDeleting">
                <svg v-if="!note.isDeleting" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4">Created on: {{ formatDate(note.created_at) }}</p>
          <RouterLink
            :to="{ name: 'NoteDetail', params: { id: note.id } }"
            class="bg-blue-600/80 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm inline-block"
          >
            Open
          </RouterLink>
        </div>
      </div>
    </transition-group>
    <Snackbar :message="snackbarMessage" :duration="5000" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNoteStore } from '../stores/noteStore'
import { RouterLink, useRouter } from 'vue-router'
import Snackbar from '../components/Snackbar.vue'

const noteStore = useNoteStore()
const router = useRouter()
const snackbarMessage = ref('')

onMounted(() => {
  noteStore.fetchNotes()
})

function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
}

const handleNewNote = async () => {
  try {
    const newNoteId = await noteStore.createNote();
    if (newNoteId) {
      await router.push({ name: 'NoteDetail', params: { id: newNoteId } });
      console.log('Navigated to new note:', newNoteId);
    }
  } catch (error) {
    console.error('Error creating note:', error);
  }
}

const handleDeleteNote = async (id: number | undefined) => {
  if (!id) return;

  // Set isDeleting flag
  const noteIndex = noteStore.notes.findIndex(note => note.id === id);
  if (noteIndex !== -1) {
    noteStore.notes[noteIndex] = { ...noteStore.notes[noteIndex], isDeleting: true };
  }

  try {
    await noteStore.deleteNote(id);
    console.log('Note deleted:', id);
  } catch (error) {
    console.error('Error deleting note:', error);
    // Reset isDeleting flag if there's an error
    if (noteIndex !== -1) {
      noteStore.notes[noteIndex] = { ...noteStore.notes[noteIndex], isDeleting: false };
    }
  }
}

const handleShareNote = async (id: number | undefined) => {
  if (!id) return;

  // Set isSharing flag
  const noteIndex = noteStore.notes.findIndex(note => note.id === id);
  if (noteIndex !== -1) {
    noteStore.notes[noteIndex] = { ...noteStore.notes[noteIndex], isSharing: true };
  }

  try {
    const shareableUrl = await noteStore.shareNote(id);
    console.log('Note shared:', id, 'Shareable URL:', shareableUrl);
    snackbarMessage.value = `Shareable URL: ${shareableUrl}`;
  } catch (error) {
    console.error('Error sharing note:', error);
    snackbarMessage.value = 'Error sharing note. Please try again.';
  } finally {
    // Reset isSharing flag
    if (noteIndex !== -1) {
      noteStore.notes[noteIndex] = { ...noteStore.notes[noteIndex], isSharing: false };
    }
  }
}
</script>

<style scoped>
.note-list-enter-active,
.note-list-leave-active {
  transition: all 0.5s ease;
}
.note-list-enter-from,
.note-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>