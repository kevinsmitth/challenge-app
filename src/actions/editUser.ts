import axios, { HttpStatusCode } from 'axios'
import actions from '.'

export interface User {
  id: number
  name: string
  email: string
  password: string
  password_confirmation: string
  phone: string
  cpf: string
}

export async function editUser(data: User, userId: number) {
  try {
    await axios.put(`http://localhost/api/users/${userId}`, data)

    await actions.fetchUsers()
    return HttpStatusCode.Ok
  } catch (error) {
    throw error
  }
}
