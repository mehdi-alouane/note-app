<!-- Snackbar.vue -->
<template>
    <Transition name="snackbar">
      <div v-if="isVisible" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div class="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <span>{{ message }}</span>
          <button @click="hideSnackbar" class="ml-4 text-gray-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </template>

  <script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps<{
    message: string;
    duration?: number;
  }>();

  const isVisible = ref(false);

  const showSnackbar = () => {
    isVisible.value = true;
    if (props.duration) {
      setTimeout(hideSnackbar, props.duration);
    }
  };

  const hideSnackbar = () => {
    isVisible.value = false;
  };

  watch(() => props.message, (newMessage) => {
    if (newMessage) {
      showSnackbar();
    }
  });
  </script>

  <style scoped>
  .snackbar-enter-active,
  .snackbar-leave-active {
    transition: all 0.3s ease;
  }
  .snackbar-enter-from,
  .snackbar-leave-to {
    opacity: 0;
    transform: translateY(-20px) translateX(-50%);
  }
  </style>