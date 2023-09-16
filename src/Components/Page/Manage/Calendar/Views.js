import * as React from 'react'
// import './schedule-component.css'
import clsx from 'clsx'
import Day from './Day'
import Header from './Header'
import { Table } from './Table'
import { getTimeTable, getDataRoom, getDataSession } from '../../../../services/apiService'
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

  const { token } = useAppContext()

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

  const [abc, setAbc] = React.useState('')

  console.log('listRoom', listRoom)
  console.log('abc', abc)
  // handle
  const handleModal = (e, id, name) => {
    if (!e.target.outerText) {
      const splitId = id.split('_')
      const date = convertDateFormat(splitId[0])
      const id_classRoom = splitId[1]
      const id_session = splitId[2]
      setAbc({ date, id_classRoom, id_session })
      setOpen(true)
      setBtnName(name)
    } else {
      console.log('huhahaha')
    }
  }

  // Api
  const fetchData = async () => {
    let dataTable = await getTimeTable(token)
    let dataRoom = await getDataRoom(token)
    let dataSession = await getDataSession(token)

    if (dataTable.status && dataRoom.status && dataSession.status === true) {
      setListTable(dataTable.data)
      setListRoom(dataRoom.data)
      setListSession(dataSession.data)
    }
    if (dataTable.status && dataRoom.status && dataSession.status === false) {
      toast.error('Lỗi dữ liệu...')
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const showData = (id) => {
    const splitId = id.split('_')
    const date = convertDateFormat(splitId[0])
    const id_classRoom = splitId[1]
    const id_session = splitId[2]
    return listTable.map((data) => {
      if (
        date === data.date &&
        id_classRoom === String(data.classroom.id) &&
        id_session === String(data.session.id)
      ) {
        return data.subject.subject_name
      }
      return ''
    })
  }
  return (
    <>
      {/* <div className="">
  <Day dataDay={DATA_DAY} />
</div>
<div className="">
  <Header listRoom={listRoom} listSession={listSession} />
  <Table
    totalTable={totalTable}
    listSession={listSession}
    handleModal={handleModal}
  />
</div> */}
      <section className={clsx(['min-w-[635px] overflow-hidden'])}>
        {listRoom && listSession && (
          <>
            <div className="flex overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th colSpan="1"></th>
                    {listRoom?.map((listRoom) => (
                      <th key={listRoom.id} colSpan={listSession.length}>
                        {listRoom.classroom_name}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    <th></th>
                    {listRoom.map((room) =>
                      listSession.map((session) => <th>{session.session_name}</th>)
                    )}
                  </tr>
                </thead>
                <tbody>
                  {DATA_DAY.map((day, index) => (
                    <tr key={index}>
                      <th id={day?.split('(')[1]?.split(')')[0]}>{day}</th>
                      {listRoom.map((room) =>
                        listSession.map((session) => (
                          <>
                            <td
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
                          </>
                        ))
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
      <Modal open={open} setOpen={setOpen} btnName={btnName} abc={abc} />
    </>
  )
}
export default Views
