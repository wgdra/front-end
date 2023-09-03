import { useRef } from 'react'
import { toast } from 'react-toastify'
import { deleteDataUser } from '../../../../services/apiService'

export default function ModalDeleteUser(props) {
  const { setOpen, inforUser, fetchDataUser } = props
  const cancelButtonRef = useRef(null)

  console.log(inforUser)
  const handleDeleteUser = async () => {
    await deleteDataUser(inforUser.id)
    toast.error(`Đã xóa ${inforUser.full_name}`)
    setOpen(false)
    fetchDataUser()
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Xóa Giảng Viên Này?</h1>
      <form className="text-gray-900 text-lg font-medium bg-white shadow-md rounded px-8 py-10">
        <div className="mb-10">
          <label className="block mb-2" htmlFor="id">
            Mã Giảng Viên
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            type="text"
            placeholder={inforUser.id}
            disabled
          />
        </div>
        <div className="mb-10">
          <label className="block mb-2" htmlFor="roomname">
            Tên Giảng Viên
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder={inforUser.full_name}
            disabled
          />
        </div>
      </form>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => handleDeleteUser()}
        >
          Xóa
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpen(false)}
          ref={cancelButtonRef}
        >
          Hủy
        </button>
      </div>
    </>
  )
}
