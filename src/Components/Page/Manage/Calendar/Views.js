import * as React from 'react'
// import './schedule-component.css'
import clsx from 'clsx'
import {
  getTimeTable,
  getDataRoom,
  getDataSession,
  getDataOneUser,
} from '../../../../services/apiService'
import Modal from '../Modals/Modal'
import moment from 'moment'
import { convertDateFormat } from '../../../../utils/convertDateFormat'
import { useAppContext } from '../../../../context/UserContext'
import { toast } from 'react-toastify'
/**
 * Schedule views sample
 */

const Views = (props) => {
  const { isOptionWeek } = props

  const valueWeekFormat = convertDateFormat(isOptionWeek)

  const [DATA_DAY, setDATADAY] = React.useState()
  const [open, setOpen] = React.useState(false)
  const [btnName, setBtnName] = React.useState('')

  const [listTable, setListTable] = React.useState('')
  const [listRoom, setListRoom] = React.useState([''])
  const [listSession, setListSession] = React.useState('')
  const [dataOneUser, setDataOneUser] = React.useState('')

  const [dataForm, setDataForm] = React.useState('')

  const { token, currentUser } = useAppContext()

  React.useEffect(() => {
    setDATADAY([
      `Thứ 2 (${isOptionWeek})`,
      `Thứ 3 (${moment(new Date(valueWeekFormat)).add('days', 1).format('DD/MM/YYYY')})`,
      `Thứ 4 (${moment(new Date(valueWeekFormat)).add('days', 2).format('DD/MM/YYYY')})`,
      `Thứ 5 (${moment(new Date(valueWeekFormat)).add('days', 3).format('DD/MM/YYYY')})`,
      `Thứ 6 (${moment(new Date(valueWeekFormat)).add('days', 4).format('DD/MM/YYYY')})`,
      `Thứ 7 (${moment(new Date(valueWeekFormat)).add('days', 5).format('DD/MM/YYYY')})`,
      `Chủ Nhật (${moment(new Date(valueWeekFormat)).add('days', 6).format('DD/MM/YYYY')})`,
    ])
  }, [isOptionWeek, valueWeekFormat])

  // handle
  const handleModal = (e, id, name) => {
    if (!e.target.outerText) {
      const splitId = id.split('_')
      const date = convertDateFormat(splitId[0])
      const id_classRoom = splitId[1]
      const id_session = splitId[2]
      setDataForm({ date, id_classRoom, id_session, dataOneUser })
      setOpen(true)
      setBtnName(name)
    } else {
      return
    }
  }

  // Api
  React.useEffect(() => {
    fetchData()
    fetchDataTable()
    fetchDataOneUser()
  }, [])

  const fetchData = async () => {
    let dataRoom = await getDataRoom(token)
    let dataSession = await getDataSession(token)

    if (dataRoom.status === true) {
      setListRoom(dataRoom.data)
    } else {
      toast.error('Lỗi!!! Không lấy được dữ liệu phòng học...')
    }

    if (dataSession.status === true) {
      setListSession(dataSession.data)
    } else {
      toast.error('Lỗi!!! Không lấy được dữ liệu ca học...')
    }
  }

  const fetchDataTable = async () => {
    let res = await getTimeTable(token)

    if (res.status === true) {
      setListTable(res.data)
    } else {
      toast.error('Lỗi!!! Không lấy được dữ liệu lịch học...')
    }
  }

  const fetchDataOneUser = async () => {
    let res = await getDataOneUser(currentUser.id)

    if (res.status === true) {
      setDataOneUser(res.data)
    } else {
      return toast.error(res.msg)
    }
  }

  const showData = (id) => {
    const splitId = id.split('_')
    const date = convertDateFormat(splitId[0])
    const id_classRoom = splitId[1]
    const id_session = splitId[2]

    return listTable?.map((data) => {
      if (
        date === data.date &&
        id_classRoom === String(data.classroom.id) &&
        id_session === String(data.session.id)
      ) {
        const allStatus = () => {
          if (data.status === 1) return 'Đã duyệt'
          if (data.status === 2) return 'Hủy bỏ'
          if (data.status === 3) return 'Đang duyệt'
        }
        return (
          <>
            <div
              className={clsx(
                data.status === 3 ? 'bg-yellow-400' : '',
                data.status === 2 ? 'bg-red-400' : '',
                data.status === 1 ? 'bg-green-400' : '',
                'flex flex-col w-full h-full m-1 p-2'
              )}
            >
              <span className="block text-base mb-3">Trạng thái: {allStatus()}</span>

              <div className="mb-2">
                <span className="text-base">Giảng Viên:</span>
                <h4 class="text-xl font-bold text-gray-900">{data.user.full_name}</h4>
              </div>

              <p class="mb-3 font-bold text-gray-900">Bộ Môn: {data.subject.subject_name}</p>
            </div>
          </>
        )
      }
      return ''
    })
  }

  const classSession = () => {
    if (listSession.length === 1) {
      return 'w-full'
    }

    return `w-1/${listSession.length}`
  }

  return (
    <>
      <section className="overflow-scroll w-full">
        {listRoom && listSession && (
          <>
            <table className="text-base font-semibold">
              <thead className="h-32">
                <tr className="flex h-16">
                  <th className="min-w-[200px]" colSpan="1"></th>
                  {listRoom?.map((listRoom) => (
                    <th
                      className="w-[620px] flex items-center justify-center border border-solid border-primary "
                      key={listRoom.id}
                      colSpan={listSession.length}
                    >
                      {listRoom.classroom_name}
                    </th>
                  ))}
                </tr>
                <tr className="flex h-16">
                  <th className="min-w-[200px]" colSpan="1"></th>
                  {listRoom.map((room) =>
                    listSession.map((session) => (
                      <th
                        className={clsx([
                          classSession(),
                          'h-full flex items-center justify-center border border-solid border-primary',
                        ])}
                      >
                        {session.session_name}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {DATA_DAY.map((day, index) => (
                  <tr key={index} className="flex h-64">
                    <td
                      className="min-w-[200px] flex items-center justify-center border border-solid border-primary"
                      id={day?.split('(')[1]?.split(')')[0]}
                    >
                      {day}
                    </td>
                    {listRoom.map((room) =>
                      listSession.map((session) => (
                        <td
                          className={clsx([
                            classSession(),
                            'h-64 flex items-center justify-center border border-solid border-primary',
                          ])}
                          key={`${day?.split('(')[1]?.split(')')[0]}_${room.id}_${session.id}`}
                          id={`${day?.split('(')[1]?.split(')')[0]}_${room.id}_${session.id}`}
                          onClick={(e) =>
                            handleModal(
                              e,
                              `${day?.split('(')[1]?.split(')')[0]}_${room.id}_${session.id}`,
                              'add-timeTable'
                            )
                          }
                        >
                          {showData(
                            `${day?.split('(')[1]?.split(')')[0]}_${room.id}_${session.id}`
                          )}
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>
      <Modal
        open={open}
        setOpen={setOpen}
        btnName={btnName}
        dataForm={dataForm}
        fetchDataTable={fetchDataTable}
      />
    </>
  )
}
export default Views
