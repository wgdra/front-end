import { useState } from 'react'
import Views from './Calendar/Views'
import { SvgArrowDown } from '../../ui/Svg'

export default function RoomRegister() {
  const [optionMonth, setOptionMonth] = useState('Aug')
  const [isOptionWeek, setIsOptionWeek] = useState('')

  const showOptionWeek = () => {
    switch (optionMonth) {
      case 'Aug':
        // code block
        return (
          <>
            <option value="Week-1">Tuần 1 - Ngày 01 - Ngày 06</option>
            <option value="Week-2">Tuần 2 - Ngày 07 - Ngày 13</option>
            <option value="Week-3">Tuần 3 - Ngày 14 - Ngày 20</option>
            <option value="Week-4">Tuần 4 - Ngày 21 - Ngày 27</option>
            <option value="Week-5">Tuần 5 - Ngày 28 - Ngày 31</option>
          </>
        )
      case 'Sep':
        // code block
        return (
          <>
            <option value="Week-1">Tuần 1 - Ngày 01 - Ngày 03</option>
            <option value="Week-2">Tuần 2 - Ngày 04 - Ngày 10</option>
            <option value="Week-3">Tuần 3 - Ngày 11 - Ngày 17</option>
            <option value="Week-4">Tuần 4 - Ngày 18 - Ngày 24</option>
            <option value="Week-5">Tuần 5 - Ngày 25 - Ngày 30</option>
          </>
        )

      default:
      // code block
    }
  }
  return (
    <>
      <header className="w-full">
        <div className="flex items-center justify-between h-14 -mt-5 mb-5 px-10">
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
              Phòng đang bảo trì
              <span className="block bg-yellow-500 w-20 border-solid border border-yellow-500 ml-5"></span>
            </div>
          </div>
          <div>
            <div className="inline-block relative w-28 mr-5">
              <select
                className="block font-bold appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setOptionMonth(e.target.value)}
              >
                <option value="Aug">Tháng 8</option>
                <option value="Sep">Tháng 9</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <SvgArrowDown />
              </div>
            </div>
            <div className="inline-block relative w-64">
              <select
                className="block font-bold appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setIsOptionWeek(e.target.value)}
              >
                {showOptionWeek()}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <SvgArrowDown />
              </div>
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
