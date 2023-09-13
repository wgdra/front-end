import * as React from 'react'
// import './schedule-component.css'
import clsx from 'clsx'
import Day from './Day'
import Header from './Header'
import { Table } from './Table'
import { getTimeTable, getDataRoom, getDataSession } from '../../../../services/apiService'
import Modal from '../Modals/Modal'
/**
 * Schedule views sample
 */
const DATA_DAY = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']

const Views = (props) => {
  const { isOptionWeek } = props

  const [open, setOpen] = React.useState(false)
  const [btnName, setBtnName] = React.useState('')

  const [listTable, setListTable] = React.useState('')
  const [listRoom, setListRoom] = React.useState('')
  const [listSession, setListSession] = React.useState('')

  const table = () => {
    const table = []
    for (let i = 0; i < listRoom.length; i++) {
      table[i] = []
      for (let j = 0; j < listSession.length * 7; j++) {
        table[i][j] = ''
      }
    }
    return table
  }
  const totalTable = table()

  // handle
  const handleModal = (name) => {
    setOpen(true)
    setBtnName(name)
  }

  // Api
  const fetchData = async () => {
    let dataTable = await getTimeTable()
    let dataRoom = await getDataRoom()
    let dataSession = await getDataSession()

    setListTable(dataTable)
    setListRoom(dataRoom)
    setListSession(dataSession)
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
