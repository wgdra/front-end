import { useContext, useEffect, useState } from 'react'
import Modal from './Modals/Modal'
import { getDataRoom } from '../../../services/apiService'
import InforRoom from './InfoRoom'
import { Button } from '../../ui/Button'
import { SvgInfo, SvgList, SvgPlus } from '../../ui/Svg'
import UserContext from '../../../context/UserContext'

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
    setIsUpdate(false)
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

  
  // Show list Room
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

  return (
    <div className="flex min-h-[80vh]">
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
          <span className="font-semibold">
            {isShowData ? dataRoom?.classroom_name?.toUpperCase() : 'CHỌN PHÒNG ĐỂ XEM THÔNG TIN'}
          </span>
        </div>

        <div className="max-h-full p-5 font-bold">
          <h1 className="text-xl text-gray-900">{isShowData ? 'Thông Tin Chung' : ''}</h1>
          {isShowData && (
            <>
              <div className="flex flex-col mt-10">
                <InforRoom
                  dataRoom={dataRoom}
                  setDataRoom={setDataRoom}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                  handleModal={handleModal}
                  dataRoominit={dataRoominit}
                  fetchListRoom={fetchListRoom}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        btnName={btnName}
        setIsShowData={setIsShowData}
        dataRoom={dataRoom}
        fetchListRoom={fetchListRoom}
      />
    </div>
  )
}
