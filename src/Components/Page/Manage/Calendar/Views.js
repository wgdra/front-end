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

  console.log('listRoom', listRoom)
  console.log('listSession', listSession)

  const ca1 = 1
  const phong119 = 47
  const date = '11/09/2023'
  const giatri = '1'

  const table = () => {
    const table = []
    for (let i = 0; i < listRoom.length; i++) {
      table[i] = []
      for (let j = 0; j < listSession.length * 7; j++) {
        table[i][j] = ' '
      }
    }
    table[0][0] = '1'
    return table
  }

  const totalTable = table()

  // const totalTable = [
  //   ['1', '2', '3', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
  //   ['4', '5', '6'],
  //   ['7', '8', '9'],
  // ]

  // handle
  const handleModal = (name) => {
    setOpen(true)
    setBtnName(name)
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

  return (
    <>
      <section className={clsx(['min-w-[635px] overflow-hidden'])}>
        {listRoom && listSession && (
          <>
            <div className="flex overflow-x-auto">
              <div className="">
                <Day dataDay={DATA_DAY} />
              </div>
              <div className="">
                <Header listRoom={listRoom} listSession={listSession} />
                <Table
                  totalTable={totalTable}
                  listSession={listSession}
                  handleModal={handleModal}
                />
              </div>
            </div>
          </>
        )}
      </section>
      <Modal open={open} setOpen={setOpen} btnName={btnName} fetchListRoom={listRoom} />
    </>
  )
}
export default Views
