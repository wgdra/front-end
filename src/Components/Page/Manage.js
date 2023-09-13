import { Outlet } from 'react-router-dom'
import NavManage from '../Nav/NavManage'

export default function Manage() {
  return (
    <>
      {/* TODO: h-[calc(100vh-76px)] */}
      <div className="content-container max-w-full py-10 px-20 bg-gray-200">
        <Outlet />
      </div>
    </>
  )
}
