import { useRef } from 'react'
import { toast } from 'react-toastify'
import { deleteDataSession } from '../../../../services/apiService'

export default function ModalDeleteSession(props) {
  const { setOpen, dataSession, fetchDataSession, setIsShowData } = props
  const cancelButtonRef = useRef(null)

  const handleDeleteSession = async () => {
    await deleteDataSession(dataSession.id)
    toast.error(`Đã xóa ${dataSession.session_name}`)
    setIsShowData(false)
    setOpen(false)
    fetchDataSession()
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2 text-center">Xóa {dataSession.session_name}?</h1>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => handleDeleteSession()}
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
