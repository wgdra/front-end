import * as React from 'react'
// import './schedule-component.css'
import './index.css'
import clsx from 'clsx'
import { BasicTableTwo } from './BasicTable'
/**
 * Schedule views sample
 */

const HEADER = ['', 'Phòng 1', 'Phòng 2', 'Phòng 3', 'Phòng 4']
const DATA = [
  ['', '1.00', '0.90', '0.82', '0.70'],
  ['Thứ 2', '1.11', '1.00', '0.91', '0.78'],
  ['Thứ 3', '1.22', '1.10', '1.00', '0.86'],
  ['Thứ 4', '1.42', '1.28', '1.16', '1.00'],
  ['Thứ 5', '1.66', '1.50', '1.36', '1.17'],
  ['Thứ 6', '1.88', '1.69', '1.54', '1.32'],
  ['Thứ 7', '1.90', '1.71', '1.56', '1.34'],
  ['Chủ Nhật', '2.04', '1.84', '1.68', '1.44'],
]

const Views = () => {
  return (
    <section className={clsx(['min-w-[635px]'])}>
      <h3 className="">Weight Comparison Chart</h3>
      <BasicTableTwo headers={HEADER} data={DATA} />
    </section>
  )
}
export default Views
