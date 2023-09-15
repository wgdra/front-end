import { useRef } from 'react'
import { toast } from 'react-toastify'
import { deleteRoom } from '../../../../services/apiService'
import { useAppContext } from '../../../../context/UserContext'

export default function ModalDeleteRoom(props) {
  const { setOpen, dataRoom, fetchListRoom, setIsShowData } = props
  const cancelButtonRef = useRef(null)

  const { token, currentUser } = useAppContext()

  const handleDeleteRoom = async () => {
    if (currentUser.role === 0) {
      await deleteRoom(dataRoom.id, token)
      toast.success(`Đã xóa ${dataRoom.classroom_name}`)
      setIsShowData(false)
      setOpen(false)
      fetchListRoom()
    }
    if (currentUser.role === 1) {
      toast.error('Bạn không có quyền xóa phòng')
    }
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2 text-center">Xóa {dataRoom.classroom_name}?</h1>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => handleDeleteRoom()}
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
