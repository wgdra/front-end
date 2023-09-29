import { postLogin } from './apiService'

export const login = async (username, password) => {
  const response = await postLogin(username, password)

  if (response.status === true) {
    const token = response.data
    if (token) {
      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.setItem('token', JSON.stringify(response.data.token))
    }
    return response
  } else {
    return response
  }
}

export const isAuthenticated = () => {
  const user = localStorage.getItem('user')
  if (!user) {
    return null
  }
  return JSON.parse(user)
}
