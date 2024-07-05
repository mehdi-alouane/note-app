<template>
    <div class="bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <input id="email" name="email" type="email" autocomplete="email" required
                  v-model="email"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600"
                >
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1">
                <input id="password" name="password" type="password" autocomplete="new-password" required
                  v-model="password"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600"
                >
              </div>
            </div>

            <div>
              <button type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :class="{ 'opacity-50 cursor-not-allowed': loading }"
              >
                Register
              </button>
            </div>
          </form>

          <div class="mt-6">
            <router-link to="/login" class="text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </router-link>
          </div>
        </div>
      </div>

      <!-- Snackbar -->
      <div v-if="snackbar" class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
        {{ snackbarText }}
      </div>
    </div>
  </template>

  <script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/authStore'

  export default defineComponent({
    name: 'RegisterView',
    setup() {
      const router = useRouter()
      const authStore = useAuthStore()

      const email = ref('')
      const password = ref('')
      const loading = ref(false)
      const snackbar = ref(false)
      const snackbarText = ref('')

      const showSnackbar = (message: string) => {
        snackbarText.value = message
        snackbar.value = true
        setTimeout(() => {
          snackbar.value = false
        }, 3000)
      }

      const handleSubmit = async () => {
        loading.value = true
        try {
          await authStore.register(email.value, password.value)
          showSnackbar('Registration successful!')
          router.push('/')
        } catch (error) {
          if (error instanceof Error) {
          showSnackbar(error.message || 'An error occurred. Please try again.');
        } else {
          showSnackbar('An unknown error occurred. Please try again.');
        }
        } finally {
          loading.value = false
        }
      }

      return {
        email,
        password,
        loading,
        snackbar,
        snackbarText,
        handleSubmit,
      }
    },
  })
  </script>