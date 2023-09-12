import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Error from './Components/Page/Error'
import Home from './Components/Page/Home'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RoomRegister from './Components/Page/Manage/RoomRegister'
import Manage from './Components/Page/Manage'
import ManageRoom from './Components/Page/Manage/ManageRoom'
import ManageUser from './Components/Page/Manage/ManageUser'
import ManageSubject from './Components/Page/Manage/ManageSubject'
import ManageSession from './Components/Page/Manage/ManageSession'
import Profile from './Components/Page/Profile'
import { UserProvider } from './context/UserContext'

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="manage" element={<Manage />}>
              <Route path="/manage/room-register" element={<RoomRegister />} />
              <Route path="/manage/manage-room" element={<ManageRoom />} />
              <Route path="/manage/manage-user" element={<ManageUser />} />
              <Route path="/manage/manage-subject" element={<ManageSubject />} />
              <Route path="/manage/manage-session" element={<ManageSession />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}
