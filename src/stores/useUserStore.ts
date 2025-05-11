import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types/user'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const total = ref<number>(0)
  const page = ref<number>(1)
  const itemsPerPage = ref<number>(10)
  const search = ref<string>('')
  const setUsers = (newUsers: User[]) => (users.value = newUsers)
  const setTotal = (newTotal: number) => (total.value = newTotal)
  const setPage = (newPage: number) => (page.value = newPage)
  const setItemsPerPage = (newItemsPerPage: number) => (itemsPerPage.value = newItemsPerPage)
  const setSearch = (newSearch: string) => (search.value = newSearch)

  return {
    users,
    total,
    page,
    itemsPerPage,
    search,
    setUsers,
    setTotal,
    setPage,
    setItemsPerPage,
    setSearch,
  }
})
