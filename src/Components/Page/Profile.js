import NavManage from '../Nav/NavManage'

const Profile = () => {
  return (
    <>
      <NavManage />
      {/* TODO: h-[calc(100vh-76px)] */}
      <div className="content-container max-w-full h-[calc(100vh-76px)] py-10 px-20 bg-gray-200"></div>
    </>
  )
}

export default Profile
