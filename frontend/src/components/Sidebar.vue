<template>
  <div class="w-1/4 p-4 border-r border-gray-700 flex flex-col">
    <!-- Icons -->
    <div class="flex space-x-2 mb-6">
      <button v-for="icon in staticIcons" :key="icon.name" class="p-2 hover:bg-gray-700 rounded">
        <component :is="icon" class="w-6 h-6" />
      </button>
      <button @click="handleCreateNote" class="p-2 hover:bg-gray-700 rounded">
        <PlusIcon class="w-6 h-6" />
      </button>
      <button @click="handleEditSave" class="p-2 hover:bg-gray-700 rounded">
        <component :is="editSaveIcon" class="w-6 h-6" />
      </button>
    </div>

    <!-- Note list -->
    <div class="flex-grow overflow-y-auto">
      <div v-for="note in noteStore.notes" :key="note.id"
           @click="noteStore.selectNote(note.id)"
           class="mb-2 cursor-pointer hover:bg-gray-800 p-2 rounded"
           :class="{ 'bg-gray-800': note.id === noteStore.selectedNoteId }">
        <span class="text-gray-300">📄</span>
        {{ note.title }}
      </div>
    </div>
  </div>
</template>


  <script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { PlusIcon, MagnifyingGlassIcon, TrashIcon, PencilIcon, DocumentCheckIcon } from '@heroicons/vue/24/outline';
  import { useNoteStore } from '../stores/noteStore';

  const staticIcons = [MagnifyingGlassIcon, TrashIcon];
  const noteStore = useNoteStore();

  const editSaveIcon = computed(() => noteStore.isEditMode ? DocumentCheckIcon : PencilIcon);

  function handleEditSave() {
    if (noteStore.isEditMode) {
      noteStore.toggleEditMode();
    } else {
      noteStore.toggleEditMode();
    }
  }

  function handleCreateNote() {
    noteStore.createNote();
  }

  onMounted(() => {
    noteStore.fetchNotes();
  });
  </script>