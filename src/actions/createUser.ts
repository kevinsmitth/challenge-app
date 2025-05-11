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

export async function createUser(newUser: User) {
  try {
    await axios.post('http://localhost/api/users', newUser)

    await actions.fetchUsers()
    return HttpStatusCode.Created
  } catch (error) {
    throw error
  }
}
