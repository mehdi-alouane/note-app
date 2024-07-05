<template>
  <div class="container mx-auto px-4 py-8">
    <RouterLink to="/" class="text-blue-500 hover:text-blue-600 mb-4 inline-block">&larr; Back to Notes</RouterLink>
    <div v-if="noteStore.currentNote" class="bg-white rounded-lg shadow-md p-6">
      <input
        v-model="title"
        class="text-3xl font-bold text-gray-800 mb-4 w-full border-b-2 border-transparent focus:border-blue-500 outline-none"
        @blur="updateTitle"
      >
      <p class="text-sm text-gray-600 mb-4">Created on: {{ formatDate(noteStore.currentNote.created_at) }}</p>
      <div class="prose max-w-none text-gray-600 text-3xl">
        <div class="flex flex-wrap gap-2 mb-4 text-sm">
          <button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" class="btn">H1</button>
          <button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" class="btn">H2</button>
          <button @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" class="btn">H3</button>
          <button @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()" class="btn">H4</button>
          <button @click="editor?.chain().focus().toggleHeading({ level: 5 }).run()" class="btn">H5</button>
          <button @click="editor?.chain().focus().toggleHeading({ level: 6 }).run()" class="btn">H6</button>
          <button @click="editor?.chain().focus().toggleBulletList().run()" class="btn">Bullet list</button>
          <button @click="editor?.chain().focus().toggleOrderedList().run()" class="btn">Ordered list</button>
          <button @click="editor?.chain().focus().toggleCodeBlock().run()" class="btn">Code block</button>
          <button @click="editor?.chain().focus().toggleBlockquote().run()" class="btn">Blockquote</button>
          <button @click="editor?.chain().focus().setHorizontalRule().run()" class="btn">Horizontal rule</button>
          <button @click="saveNote" class="py-2 px-4 rounded-md bg-blue-500 text-white">Save</button>
        </div>
        <editor-content class="text-gray-600 bg-gray-500/10 border border-color-gray-600 rounded-sm" :editor="editor" />
      </div>
    </div>
    <div v-else class="text-center py-8">
      <p class="text-xl text-gray-600">Loading note...</p>
    </div>

    <!-- Snackbar -->
    <div
      v-if="showSnackbar"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300"
      :class="{ 'opacity-100': showSnackbar, 'opacity-0': !showSnackbar }"
    >
      {{ snackbarMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNoteStore } from '../stores/noteStore'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'

const route = useRoute()
const noteStore = useNoteStore()
const title = ref('')
const showSnackbar = ref(false)
const snackbarMessage = ref('')

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    Typography,
    Highlight,
  ],
})

onMounted(async () => {
  const noteId = Number(route.params.id)
  await noteStore.fetchNoteById(noteId)
})

watch(() => noteStore.currentNote, (newNote) => {
  if (newNote) {
    title.value = newNote.title
    if (editor.value) {
      editor.value.commands.setContent(newNote.content)
    }
  }
}, { immediate: true })

function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
}

async function updateTitle() {
  if (noteStore.currentNote && title.value !== noteStore.currentNote.title) {
    try {
      await noteStore.updateNote(noteStore.currentNote.id, { title: title.value })
      showSnackbarMessage('Title updated successfully')
    } catch (error) {
      console.error('Error updating title:', error)
      showSnackbarMessage('Error updating title')
    }
  }
}

async function saveNote() {
  if (noteStore.currentNote && editor.value) {
    const updatedContent = editor.value.getHTML()
    try {
      await noteStore.updateNote(noteStore.currentNote.id, { content: updatedContent })
      showSnackbarMessage('Note saved successfully')
    } catch (error) {
      console.error('Error saving note:', error)
      showSnackbarMessage('Error saving note')
    }
  }
}

function showSnackbarMessage(message: string) {
  snackbarMessage.value = message
  showSnackbar.value = true
  setTimeout(() => {
    showSnackbar.value = false
  }, 3000)
}
</script>

<style scoped>
.btn {
  @apply px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors;
}
</style>