import { useRef, useContext } from 'react'
import { toast } from 'react-toastify'
import { deleteDataUser } from '../../../../services/apiService'
import UserContext from '../../../../context/UserContext'

export default function ModalDeleteUser(props) {
  const { setOpen, inforUser, fetchDataUser, setIsShowData } = props
  const cancelButtonRef = useRef(null)

  const { token } = useContext(UserContext)

  const handleDeleteUser = async () => {
    await deleteDataUser(inforUser.id, token)
    toast.error(`Đã xóa ${inforUser.full_name}`)
    setOpen(false)
    setIsShowData(false)
    fetchDataUser()
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2 text-center">Xóa {inforUser.full_name}?</h1>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
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
