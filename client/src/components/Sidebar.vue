<template>
  <div class="w-64 bg-gray-800 text-white p-4">
    <h1 class="text-2xl font-bold mb-4">Notes</h1>
    <button @click="$emit('create-note')" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full">
      New Note
    </button>
    <ul v-if="notes && !isLoading">
      <li v-for="note in notes" :key="note.id" @click="$emit('select-note', note)"
          class="cursor-pointer hover:bg-gray-700 p-2 rounded">
        {{ note.title }}
      </li>
    </ul>
    <p v-else-if="error">Error loading notes: {{ error }}</p>
    <p v-else-if="isLoading">Loading notes...</p>
  </div>
</template>

<script setup lang="ts">
import { Note } from '../App.vue';
defineProps({
  notes: Array<Note> || [],
  isLoading: Boolean,
  error: Error
});
defineEmits(['select-note', 'create-note']);
</script>