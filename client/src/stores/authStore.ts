// src/stores/authStore.ts
import { defineStore } from 'pinia'
import api from '../api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await api.post('auth/login', { email, password })
        this.setToken(response.data.access_token)
        return response.data
      } catch (error) {
        throw error
      }
    },
    async register(email: string, password: string) {
      try {
        const response = await api.post('auth/register', { email, password })
        this.setToken(response.data.access_token)
        return response.data
      } catch (error) {
        throw error
      }
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('access_token', token)
    },
    clearToken() {
      this.token = null
      localStorage.removeItem('access_token')
    },
    logout() {
      this.clearToken()
    }
  }
})