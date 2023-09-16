import clsx from 'clsx'
import { Button } from '../ui/Button'

const TimeTable = [
  {
    id: 1,
    teacher_id: 1,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 1',
    subject_name: 'Tin học',
    date: '01/09/2023',
  },
  {
    id: 2,
    teacher_id: 1,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 2',
    subject_name: 'Tin học',
    date: '01/09/2023',
  },
  {
    id: 3,
    teacher_id: 1,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 3',
    subject_name: 'Tin học',
    date: '01/09/2023',
  },
  {
    id: 4,
    teacher_id: 2,
    full_name: 'Nguyễn Văn Tiến',
    room_name: 'Phòng 101',
    session_name: 'Ca 1',
    subject_name: 'Tin học',
    date: '02/09/2023',
  },
  {
    id: 5,
    teacher_id: 2,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 2',
    subject_name: 'Tin học',
    date: '02/09/2023',
  },
  {
    id: 6,
    teacher_id: 2,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 3',
    subject_name: 'Tin học',
    date: '02/09/2023',
  },
  {
    id: 7,
    teacher_id: 3,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 1',
    subject_name: 'Tin học',
    date: '03/09/2023',
  },
  {
    id: 6,
    teacher_id: 2,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 3',
    subject_name: 'Tin học',
    date: '02/09/2023',
  },
  {
    id: 7,
    teacher_id: 3,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 1',
    subject_name: 'Tin học',
    date: '03/09/2023',
  },
  {
    id: 6,
    teacher_id: 2,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 3',
    subject_name: 'Tin học',
    date: '02/09/2023',
  },
  {
    id: 7,
    teacher_id: 3,
    full_name: 'Nguyễn Văn Tú',
    room_name: 'Phòng 101',
    session_name: 'Ca 1',
    subject_name: 'Tin học',
    date: '03/09/2023',
  },
]
const ManageRegistForm = () => {
  return (
    <div className="flex h-[80vh]">
      <div className="w-full p-5 border bg-white border-primary overflow-y-scroll">
        <table className="w-full text-left text-base font-light relative">
          <thead className="border-b font-medium dark:border-neutral-500 fixed">
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
            {TimeTable.map((item, index) => {
              return (
                <>
                  <tr
                    className={clsx(
                      index % 2 !== 0 ? 'bg-gray-50' : '',
                      'border-b border-gray-200 hover:bg-gray-100'
                    )}
                    key={item}
                  >
                    <td className="whitespace-nowrap px-4 py-4">{item.id}</td>
                    <td className="whitespace-nowrap px-4 py-4">{item.teacher_id}</td>
                    <td className="whitespace-nowrap px-4 py-4">{item.full_name}</td>
                    <td className="whitespace-nowrap px-4 py-4">{item.room_name}</td>
                    <td className="whitespace-nowrap px-4 py-4">{item.session_name}</td>
                    <td className="whitespace-nowrap px-4 py-4">{item.subject_name}</td>
                    <td className="whitespace-nowrap px-4 py-4">{item.date}</td>
                    <td className="flex justify-center py-4">
                      <Button
                        name="delete-form"
                        className="bg-gray-600 mr-5"
                        onClick={() => {}}
                        text="Hủy"
                      />
                      <Button
                        type="submit"
                        name="update-form"
                        className="bg-emerald-600"
                        text="Duyệt"
                      />
                    </td>
                  </tr>
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
