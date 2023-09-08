import NavManage from '../Nav/NavManage'
import ManageProfile from './Manage/ManageProfile'

const Profile = () => {
  return (
    <>
      <NavManage />
      {/* TODO: h-[calc(100vh-76px)] */}
      <div className="content-container max-w-full h-[calc(100vh-76px)] py-10 px-20 bg-gray-200">
        <ManageProfile />
      </div>
    </>
  )
}

export default Profile
