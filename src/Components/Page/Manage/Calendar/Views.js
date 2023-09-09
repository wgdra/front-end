import * as React from 'react'
// import './schedule-component.css'
import clsx from 'clsx'
import Day from './Day'
import Header from './Header'
import { Table } from './Table'
import { getDataRoom, getDataSession } from '../../../../services/apiService'
import Modal from '../Modals/Modal'
/**
 * Schedule views sample
 */

const DATA_ROOM = ['Phòng 1', 'Phòng 2', 'Phòng 3', 'Phòng 4', 'Phòng 5', 'Phòng 6', 'Phòng 7']
const DATA_SESSION = ['Ca 1', 'Ca 2', 'Ca 3']
const DATA_DAY = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']

const DATA_TABLE = [['1'], ['1'], ['1'], ['1'], ['1'], ['1'], ['1']]

const Views = (props) => {
  const { isOptionWeek } = props

  const [listRoom, setListRoom] = React.useState('')
  const [listSession, setListSession] = React.useState('')

  const fetchData = async () => {
    let dataRoom = await getDataRoom()
    let dataSession = await getDataSession()
    setListRoom(dataRoom)
    setListSession(dataSession)
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const [open, setOpen] = React.useState(false)
  const [btnName, setBtnName] = React.useState('')

  const handleModal = (name) => {
    setOpen(true)
    setBtnName(name)
  }

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
                <Table dataTable={DATA_TABLE} listSession={listSession} handleModal={handleModal} />
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
