import { useState } from 'react'
import Views from './Calendar/Views'
import { SvgArrowDown } from '../../ui/Svg'
import { dateDefault } from '../../../utils/dateDefault'
import moment from 'moment'

export default function RoomRegister() {
  const [isOptionWeek, setIsOptionWeek] = useState('11/09/2023')

  var count = 1
  var newDate = moment(new Date('2023-09-11'))

  const handleWeek = (dateStr, number) => {
    const firstDayofWeek = moment(new Date(dateStr))
    const lastDayofWeek = moment(new Date(firstDayofWeek)).add('days', 6)
    count++
    newDate = moment(new Date(lastDayofWeek)).add('days', 1)

    return `Tuần ${number} (${firstDayofWeek.format('DD/MM/YYYY')} - ${lastDayofWeek.format(
      'DD/MM/YYYY'
    )})`
  }

  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  const showOptionWeek = () => {
    return a.map((_, index) => (
      <option
        key={index}
        value={typeof newDate === 'string' ? newDate : newDate.format('DD/MM/YYYY')}
      >
        {handleWeek(newDate, count)}
      </option>
    ))
  }
  return (
    <>
      <header className="w-full">
        <div className="flex items-center justify-between h-14 mt-5 mb-5 px-10">
          <div className="flex items-center w-2/3 text-base">
            <span className="font-bold text-red-600">GHI CHÚ:</span>
            <div className="flex font-semibold ml-10">
              Phòng trống
              <span className="block bg-white w-20 border-solid border border-gray-400 ml-5"></span>
            </div>
            <div className="flex font-semibold ml-10">
              Phòng đã đăng ký
              <span className="block bg-green-500 w-20 border-solid border border-green-500 ml-5"></span>
            </div>
            <div className="flex font-semibold ml-10">
              Phòng đang chờ duyệt
              <span className="block bg-yellow-500 w-20 border-solid border border-yellow-500 ml-5"></span>
            </div>
          </div>
          <div>
            <div className="inline-block relative">
              <select
                className="block font-bold appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setIsOptionWeek(e.target.value)}
              >
                {showOptionWeek()}
              </select>
            </div>
          </div>
        </div>
      </header>
      <div className="bg-white border-solid border-2 border-primary">
        <Views isOptionWeek={isOptionWeek} />
      </div>
    </>
  )
}
