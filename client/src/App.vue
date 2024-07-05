<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <RouterLink to="/" class="text-2xl font-bold text-blue-600">Notely</RouterLink>
        <div v-if="authStore.isAuthenticated" class="flex items-center">
          <button @click="toggleDropdown" class="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <div v-if="showDropdown" class="absolute right-0 mt-24 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <a href="#" @click.prevent="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>

    <footer class="bg-white border-t mt-auto">
      <!-- Footer content here -->
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useAuthStore } from './stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const logout = () => {
  authStore.logout()
  router.push('/login')
  showDropdown.value = false
}

// Close dropdown when clicking outside
const closeDropdown = (event: MouseEvent) => {
  if (showDropdown.value && !(event.target as Element).closest('.user-dropdown')) {
    showDropdown.value = false
  }
}

// Add event listener for clicks outside dropdown
// document.addEventListener('click', closeDropdown)

// Remove event listener when component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>