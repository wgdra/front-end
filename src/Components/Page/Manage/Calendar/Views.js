import * as React from 'react'
// import './schedule-component.css'
import clsx from 'clsx'
import Day from './Day'
import Header from './Header'
import { Table } from './Table'
/**
 * Schedule views sample
 */

const DATA_ROOM = [
  'Phòng 1',
  'Phòng 2',
  'Phòng 3',
  'Phòng 4',
  'Phòng 5',
  'Phòng 6',
  'Phòng 7',
  'Phòng 8',
  'Phòng 9',
  'Phòng 10',
]
const DATA_SESSION = ['Ca 1', 'Ca 2', 'Ca 3']
const DATA_DAY = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']

const DATA_TABLE = [
  ['1', '2', '3'],
  ['1', '2', '3'],
  ['1', '2', '3'],
  ['1', '2', '3'],
  ['1', '2', '3'],
  ['1', '2', '3'],
  ['1', '2', '3'],
]

const Views = () => {
  return (
    <section className={clsx(['min-w-[635px] overflow-hidden'])}>
      <div className="flex overflow-x-auto">
        <div className="">
          <Day dataDay={DATA_DAY} />
        </div>
        <div className="">
          <Header dataRoom={DATA_ROOM} dataSession={DATA_SESSION} />
          <Table dataTable={DATA_TABLE} />
        </div>
      </div>
    </section>
  )
}
export default Views
