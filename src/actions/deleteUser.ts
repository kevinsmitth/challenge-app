import axios, { HttpStatusCode } from 'axios'
import actions from '.'

export async function deleteUser(userId: number) {
  try {
    await axios.delete(`http://localhost/api/users/${userId}`)

    await actions.fetchUsers()
    return HttpStatusCode.Ok
  } catch (error) {
    throw error
  }
}
