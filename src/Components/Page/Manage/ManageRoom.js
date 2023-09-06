import { useEffect, useState } from 'react'
import Modal from './Modals/Modal'
import { getDataRoom, putDataRoom } from '../../../services/apiService'
import InforRoom from './InfoRoom'
import { Button } from '../../ui/Button'
import { SvgInfo, SvgList, SvgMinus, SvgPencilUpdate, SvgPlus } from '../../ui/Svg'
import { toast } from 'react-toastify'

export default function ManageRoom() {
  const [open, setOpen] = useState(false)
  const [btnName, setBtnName] = useState('')

  const [listRoom, setListRoom] = useState('')
  const [dataRoominit, setDataRoomInit] = useState('')
  const [dataRoom, setDataRoom] = useState('')

  const [isShowData, setIsShowData] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  // Handle
  const handleClickRoom = (data) => {
    setIsShowData(true)
    setDataRoom(data)
    setDataRoomInit(data)
  }

  const handleModal = (name) => {
    setOpen(true)
    setBtnName(name)
  }

  // Api
  useEffect(() => {
    fetchListRoom()
  }, [])

  const fetchListRoom = async () => {
    let res = await getDataRoom()
    setListRoom(res)
  }

  const showListRoom = () => {
    if (!listRoom) return <span className="text-primary">Loading...</span>

    return (
      <>
        {listRoom && listRoom.length > 0 ? (
          listRoom.map((item, index) => {
            return (
              <div key={index}>
                <span
                  className="flex items-center cursor-pointer hover:text-primary"
                  onClick={() => handleClickRoom(item)}
                >
                  {item.classroom_name}
                </span>
              </div>
            )
          })
        ) : (
          <span>Not data</span>
        )}
      </>
    )
  }

  const handleUpdateRoom = async () => {
    await putDataRoom(dataRoom.id, dataRoom.classroom_name, dataRoom.note)
    toast.success('Cập nhật thành công')
    setIsUpdate(false)
    fetchListRoom()
  }

  return (
    <div className="flex h-[80vh]">
      <div className="w-1/3 mr-10 border bg-white border-primary">
        <div className="flex items-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <SvgList />
          <span className="font-semibold">DANH SÁCH</span>
        </div>
        <div className="p-5 font-bold">
          <Button
            name="add-room"
            className="border-emerald-600 bg-emerald-600"
            onClick={() => handleModal('add-room')}
            text="Thêm phòng"
            Svg={SvgPlus}
          />
          <div className="text-gray-900">
            <h1 className="border-b-2 border-primary mb-2">Tòa Nhà H</h1>
            <div className="mb-5">{showListRoom()}</div>
          </div>
        </div>
      </div>

      <div className="w-2/3 border bg-white border-primary">
        <div className="flex items-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <SvgInfo />
          <span className="font-semibold">{dataRoom?.classroom_name?.toUpperCase()}</span>
        </div>

        <div className="p-5 font-bold">
          <h1 className="text-xl text-gray-900">Thông Tin Chung</h1>

          {isShowData && (
            <>
              <div className="mt-10">
                <InforRoom dataRoom={dataRoom} isUpdate={isUpdate} setDataRoom={setDataRoom} />
                {!isUpdate ? (
                  <>
                    <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
                      <Button
                        name="delete-room"
                        className="border-red-600 bg-red-600"
                        onClick={() => handleModal('delete-room')}
                        text="Xóa phòng"
                        Svg={SvgMinus}
                      />
                      <Button
                        name="update-room"
                        className="border-yellow-600 bg-yellow-600"
                        onClick={() => setIsUpdate(true)}
                        text="Sửa phòng"
                        Svg={SvgPencilUpdate}
                      />
                    </div>
                  </>
                ) : (
                  <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
                    <Button
                      name="delete-room"
                      className="rounded-md bg-gray-600"
                      onClick={() => {
                        setIsUpdate(false)
                        setDataRoom(dataRoominit)
                      }}
                      text="Hủy"
                    />
                    <Button
                      name="update-room"
                      className="rounded-md bg-emerald-600"
                      onClick={() => handleUpdateRoom()}
                      text="Lưu"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        name={btnName}
        setIsShowData={setIsShowData}
        dataRoom={dataRoom}
        fetchListRoom={fetchListRoom}
      />
    </div>
  )
}
