import { postLogin } from './apiService'

export const login = async (username, password) => {
  const response = await postLogin(username, password)

  console.log('response', response)
  const token = response.token
  if (token) {
    localStorage.setItem('user', JSON.stringify(response))
    localStorage.setItem('token', JSON.stringify(response.token))
  }

  return response
}

export const isAuthenticated = () => {
  const user = localStorage.getItem('user')
  if (!user) {
    return null
  }
  return JSON.parse(user)
}
