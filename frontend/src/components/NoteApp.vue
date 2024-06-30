<template>
    <div class="flex h-screen bg-gray-900 text-white">
      <Sidebar />

      <!-- Main content area -->
      <div class="flex-1 p-8 overflow-y-auto">
        <template v-if="selectedNote">
          <input
            v-if="noteStore.isEditMode"
            v-model="editableTitle"
            class="text-4xl font-bold mb-6 bg-gray-800 p-2 w-full"
          />
          <h1 v-else class="text-4xl font-bold mb-6">{{ selectedNote.title }}</h1>

          <div
            v-if="noteStore.isEditMode"
            contenteditable="true"
            @input="updateEditableContent"
            class="prose prose-invert bg-gray-800 p-4"
            v-html="editableContent"
          ></div>
          <div v-else class="prose prose-invert" v-html="renderedContent"></div>
        </template>
        <div v-else class="text-center text-gray-500 mt-20">
          Select a note or create a new one
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { marked } from 'marked';
  import Sidebar from './Sidebar.vue';
  import { useNoteStore } from '../stores/noteStore';

  const noteStore = useNoteStore();

  const selectedNote = computed(() =>
    noteStore.notes.find(note => note.id === noteStore.selectedNoteId)
  );

  const renderedContent = computed(() => {
    if (selectedNote.value) {
      return marked(selectedNote.value.content);
    }
    return '';
  });

  const editableTitle = ref('');
  const editableContent = ref('');

  watch(selectedNote, (newNote) => {
    if (newNote) {
      editableTitle.value = newNote.title;
      editableContent.value = newNote.content;
    }
  }, { immediate: true });

  watch(() => noteStore.isEditMode, (newValue) => {
    if (newValue && selectedNote.value) {
      editableTitle.value = selectedNote.value.title;
      editableContent.value = selectedNote.value.content;
    } else if (!newValue && selectedNote.value) {
      // Save the note when exiting edit mode
      noteStore.saveNote(selectedNote.value.id, editableTitle.value, editableContent.value);
    }
  });

  function updateEditableContent(event: Event) {
    editableContent.value = (event.target as HTMLDivElement).innerHTML;
  }
  </script>

  <style>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';

  /* Add custom styles for markdown content */
  .prose {
    @apply text-gray-300;
  }

  .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    @apply text-white;
  }

  .prose a {
    @apply text-blue-400;
  }

  .prose strong {
    @apply text-white;
  }

  .prose ul, .prose ol {
    @apply pl-5;
  }

  .prose li {
    @apply mb-2;
  }

  .prose blockquote {
    @apply border-l-4 border-gray-700 pl-4 italic;
  }

  .prose code {
    @apply bg-gray-800 rounded px-1;
  }

  .prose pre {
    @apply bg-gray-800 rounded p-4 overflow-x-auto;
  }
  </style>