<template>
    <div class="flex h-screen bg-gray-900 text-white">
      <Sidebar />

      <!-- Main content area -->
      <div class="flex-1 p-8 overflow-y-auto">
        <template v-if="selectedNote">
          <h1 class="text-4xl font-bold mb-6">{{ selectedNote.title }}</h1>
          <div class="prose prose-invert" v-html="renderedContent"></div>
        </template>
        <div v-else class="text-center text-gray-500 mt-20">
          Select a note or create a new one
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { computed } from 'vue';
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