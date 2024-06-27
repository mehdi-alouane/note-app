<template>
    <div class="flex-1 p-8">
      <div v-if="selectedNote">
        <input v-model="selectedNote.title" class="text-2xl font-bold mb-4 w-full" @input="updateNote">
        <div class="mb-4">
          <button @click="toggleSharing" class="bg-green-500 text-white px-4 py-2 rounded mr-2">
            {{ selectedNote.shared ? 'Unshare' : 'Share' }}
          </button>
          <button @click="deleteNote" class="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
        <RichTextEditor v-model="selectedNote.content" @update:modelValue="updateContent" />
      </div>
      <div v-else class="text-center text-gray-500 text-2xl mt-20">
        Select or create a note to get started
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { watch } from 'vue';
  import {useFetch} from '../hooks/useFetch.ts';
  import RichTextEditor from './RichTextEditor.vue';

  const props = defineProps(['selectedNote']);
  const emit = defineEmits(['update-note', 'delete-note']);
  const { data, error:err } = useFetch('http://localhost:3000/api/notes');
  console.log(data);
  console.log(err);

  function updateNote() {
    emit('update-note', props.selectedNote);
  }

  function updateContent(content) {
    if (props.selectedNote) {
      props.selectedNote.content = content;
      updateNote();
    }
  }

  function toggleSharing() {
    if (props.selectedNote) {
      props.selectedNote.shared = !props.selectedNote.shared;
      updateNote();
    }
  }

  function deleteNote() {
    if (props.selectedNote) {
      emit('delete-note', props.selectedNote.id);
    }
  }

  watch(() => props.selectedNote, updateNote);
  </script>