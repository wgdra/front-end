import { useAppContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../services/AuthService'

export const PrivateRoute = ({ children }) => {
  const { currentUser } = useAppContext()
  const navigate = useNavigate()

  return currentUser.token && currentUser.role === 0 ? children : navigate('/manage/room-register')
}
