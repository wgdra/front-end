import { useEffect, useState } from 'react'
import Modal from './Modals/Modal'
import { getDataSession } from '../../../services/apiService'
import { Button } from '../../ui/Button'
import { SvgDocumentPlus, SvgInfo, SvgList, SvgPlus } from '../../ui/Svg'
import InfoSession from './InfoSession'

export default function ManageSession() {
  const [open, setOpen] = useState(false)
  const [btnName, setBtnName] = useState('')

  const [listSession, setListSession] = useState('')
  const [dataSessioninit, setSessioninit] = useState('')
  const [dataSession, setDataSession] = useState('')

  const [isShowData, setIsShowData] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  // Handle
  const handleClickListSession = (data) => {
    setDataSession(data)
    setIsShowData(true)
    setSessioninit(data)
    setIsUpdate(false)
  }

  const handleModal = (name) => {
    setOpen(true)
    setBtnName(name)
  }

  //Api
  useEffect(() => {
    fetchDataSession()
  }, [])

  const fetchDataSession = async () => {
    let res = await getDataSession()
    setListSession(res)
  }

  // Show list subject
  const showListSession = () => {
    return (
      <ul className="border-t-2 border-primary ">
        {listSession && listSession.length > 0 ? (
          listSession.map((item, index) => {
            return (
              <li
                className="flex items-center my-2 ml-2 cursor-pointer hover:text-primary"
                key={index}
                onClick={() => handleClickListSession(item)}
              >
                <SvgDocumentPlus />
                {item.session_name}
              </li>
            )
          })
        ) : (
          <span>Not Data</span>
        )}
      </ul>
    )
  }

  return (
    <div className="flex min-h-[80vh]">
      <div className="w-1/3 mr-10 border bg-white border-primary">
        <div className="flex items-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <SvgList />
          <span className="font-semibold">DANH SÁCH CA HỌC</span>
        </div>
        <div className="p-5 font-bold">
          <Button
            name="add-session"
            className="border-emerald-600 bg-emerald-600"
            onClick={() => handleModal('add-session')}
            text="Thêm Ca Học"
            Svg={SvgPlus}
          />

          <div className="text-gray-900">
            <div className="mb-5">{showListSession()}</div>
          </div>
        </div>
      </div>

      <div className="w-2/3 border bg-white border-primary">
        <div className="flex items-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <SvgInfo />
          <span className="font-semibold">
            {isShowData ? dataSession?.session_name?.toUpperCase() : 'CHỌN CA ĐỂ XEM THÔNG TIN'}
          </span>
        </div>

        <div className="max-h-full p-5 font-bold">
          <h1 className="text-xl text-gray-900">{isShowData ? 'Thông Tin Chung' : ''}</h1>
          {isShowData && (
            <div className="flex flex-col mt-10">
              <InfoSession
                dataSession={dataSession}
                setDataSession={setDataSession}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                handleModal={handleModal}
                dataSessioninit={dataSessioninit}
                fetchDataSession={fetchDataSession}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        setIsShowData={setIsShowData}
        btnName={btnName}
        dataSession={dataSession}
        fetchDataSession={fetchDataSession}
      />
    </div>
  )
}
