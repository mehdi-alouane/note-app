<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar
      :notes="notes"
      :isLoading="isLoading"
      :error="error"
      @select-note="selectNote"
      @create-note=""

    />
    <MainView
      :selectedNote="selectedNote"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Sidebar from './components/Sidebar.vue';
import MainView from './components/MainView.vue';
import { useFetch } from './hooks/useFetch.ts';

export interface Note {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  shared?: boolean;
}

const { data: notes, error, loading:isLoading, invalidate:refetch } = useFetch('http://localhost:3000/api/notes');
const selectedNote = ref<Note | null>(null);

function selectNote(note: Note) {
  selectedNote.value = note;
}

</script>