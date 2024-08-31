import { defineStore } from 'pinia'
import { request } from '@/utils/request'
import { setToken, removeToken, getToken } from '@/utils/auth'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    user: null
  }),
  actions: {
    async checkLoginStatus() {
      const token = getToken()
      if (token) {
        try {
          const response = await request('/api/auth/me', 'GET')
          this.user = response.data
        } catch (error) {
          console.error('获取用户信息失败:', error)
          removeToken()
          this.user = null
        }
      }
    },
    async fetchTasks() {
      try {
        const response = await request('/api/tasks', 'GET')
        this.tasks = response.data
      } catch (error) {
        console.error('获取任务失败:', error)
      }
    },
    async loginUser({ username, password }) {
      try {
        const response = await request('/api/auth/login', 'POST', { username, password })
        const { user, token } = response.data
        setToken(token)
        this.user = user
      } catch (error) {
        console.error('登录失败:', error)
        throw error
      }
    },
    async registerUser({ username, email, password }) {
      try {
        const response = await request('/api/auth/register', 'POST', { username, email, password })
        const { user, token } = response.data
        setToken(token)
        this.user = user
      } catch (error) {
        console.error('注册失败:', error)
        throw error
      }
    },
    async logoutUser() {
      removeToken()
      this.user = null
    },
    async addTask(taskData) {
      try {
        const response = await request('/api/tasks', 'POST', taskData)
        this.tasks.push(response.data)
      } catch (error) {
        console.error('添加任务失败:', error)
        throw error
      }
    },
    async updateTask({ taskId, updateData }) {
      try {
        const response = await request(`/api/tasks/${taskId}`, 'PUT', updateData)
        const index = this.tasks.findIndex(task => task._id === taskId)
        if (index !== -1) {
          this.tasks[index] = response.data
        }
      } catch (error) {
        console.error('更新任务失败:', error)
        throw error
      }
    },
    async deleteTask(taskId) {
      try {
        await request(`/api/tasks/${taskId}`, 'DELETE')
        this.tasks = this.tasks.filter(task => task._id !== taskId)
      } catch (error) {
        console.error('删除任务失败:', error)
        throw error
      }
    }
  }
})
