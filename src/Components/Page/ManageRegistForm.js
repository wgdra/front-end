import clsx from 'clsx'
import { Button } from '../ui/Button'
import { useEffect, useState } from 'react'
import { acceptDataTimeTable, getTimeTable, rejectDataTimeTable } from '../../services/apiService'
import { toast } from 'react-toastify'
import { useAppContext } from '../../context/UserContext'

const ManageRegistForm = () => {
  const [timeTable, setTimeTable] = useState()

  const { token, currentUser } = useAppContext()

  // Api

  // GET DATA TABLE
  useEffect(() => {
    fetchDataTable()
  }, [])

  const fetchDataTable = async () => {
    if (currentUser.role === 0) {
      let res = await getTimeTable(token)

      if (res.status === true) {
        setTimeTable(res.data)
      } else {
        toast.error('Lỗi!!! Không lấy được dữ liệu lịch học...')
      }
    }
    if (currentUser.role === 1) {
      toast.error('Bạn không có quyền duyệt phiếu')
    }
  }

  // Accept DATA
  const acceptDataTable = async (id) => {
    if (currentUser.role === 0) {
      let req = await acceptDataTimeTable(id)
      if (req.status === true) {
        toast.success(req.msg)
        fetchDataTable()
        return
      } else {
        toast.error(req.msg)
      }
    }
    if (currentUser.role === 1) {
      toast.error('Bạn không có quyền duyệt phiếu')
    }
  }

  // Reject DATA
  const rejectDataTable = async (id) => {
    if (currentUser.role === 0) {
      let req = await rejectDataTimeTable(id)
      if (req.status === true) {
        toast.success(req.msg)
        fetchDataTable()
        return
      } else {
        toast.error(req.msg)
      }
    }
    if (currentUser.role === 1) {
      toast.error('Bạn không có quyền duyệt phiếu')
    }
  }

  return (
    <div className="flex h-[80vh]">
      <div className="w-full p-5 border bg-white border-primary overflow-y-scroll">
        <table className="w-full text-left text-base font-light relative">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr className="bg-gray-200 text-gray-600 uppercase text-base leading-normal">
              <th scope="col" className="px-4 py-4">
                Mã phiếu
              </th>
              <th scope="col" className="px-4 py-4">
                Mã giảng viên
              </th>
              <th scope="col" className="px-4 py-4">
                Tên giảng viên
              </th>
              <th scope="col" className="px-4 py-4">
                Tên phòng
              </th>
              <th scope="col" className="px-4 py-4">
                Ca dạy
              </th>
              <th scope="col" className="px-4 py-4">
                Môn dạy
              </th>
              <th scope="col" className="px-4 py-4">
                Thời gian
              </th>
              <th scope="col" className="border-l dark:border-neutral-500 text-center">
                Kiểm duyệt
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-900 text-base font-medium pt-[56px]">
            {timeTable?.map((item, index) => {
              return (
                <>
                  {item && item.status === 3 && (
                    <tr
                      className={clsx(
                        index % 2 !== 0 ? 'bg-gray-50' : '',
                        'border-b border-gray-200 hover:bg-gray-100'
                      )}
                      key={item}
                    >
                      <td className="whitespace-nowrap px-4 py-4">{item?.id}</td>
                      <td className="whitespace-nowrap px-4 py-4">{item?.user?.id}</td>
                      <td className="whitespace-nowrap px-4 py-4">{item?.user?.full_name}</td>
                      <td className="whitespace-nowrap px-4 py-4">
                        {item?.classroom?.classroom_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">{item?.session?.session_name}</td>
                      <td className="whitespace-nowrap px-4 py-4">{item?.subject?.subject_name}</td>
                      <td className="whitespace-nowrap px-4 py-4">{item?.date}</td>
                      <td className="flex justify-center py-4">
                        <Button
                          name="delete-form"
                          className="bg-gray-600 mr-5 -mb-1"
                          onClick={() => {
                            rejectDataTable(item.id)
                          }}
                          text="Hủy"
                        />
                        <Button
                          name="update-form"
                          className="bg-emerald-600 -mb-1"
                          onClick={() => {
                            acceptDataTable(item.id)
                          }}
                          text="Duyệt"
                        />
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageRegistForm
