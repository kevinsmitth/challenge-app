import { useUserStore } from '../stores/useUserStore'
import axios from 'axios'
import { useAlert } from '@/composables/useAlert'

const { dispatchAlert } = useAlert()

export interface User {
  id: number
  name: string
  email: string
  password: string
  password_confirmation: string
  phone: string
  cpf: string
}

export async function fetchUsers(page: number = 1, itemsPerPage: number = 10, search: string = '') {
  const users = await axios
    .get(`http://localhost/api/users?page=${page}&per_page=${itemsPerPage}&search=${search}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Erro ao buscar os usuários')
      }

      return response.data
    })
    .catch((error) => {
      dispatchAlert('error', `Erro ao buscar os usuários. ${error.response?.data?.message}.`)
    })

  useUserStore().setUsers(users.data as User[])
  useUserStore().setTotal(users.total)
  useUserStore().setPage(page)
  useUserStore().setItemsPerPage(itemsPerPage)
  useUserStore().setSearch(search)
}
