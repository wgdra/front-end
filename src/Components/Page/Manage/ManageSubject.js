import { useEffect, useState } from 'react'
import Modal from './Modals/Modal'
import { getDataSubject } from '../../../services/apiService'
import { Button } from '../../ui/Button'
import { SvgDocumentPlus, SvgInfo, SvgList, SvgPlus } from '../../ui/Svg'
import InfoSubject from './InfoSubject'
import { toast } from 'react-toastify'
import { useAppContext } from '../../../context/UserContext'

export default function ManageSubject() {
  const [open, setOpen] = useState(false)
  const [btnName, setBtnName] = useState('')

  const [listSubject, setListSubject] = useState('')
  const [dataSubjectinit, setDataSubjectinit] = useState('')
  const [dataSubject, setDataSubject] = useState('')

  const [isShowData, setIsShowData] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  const { token } = useAppContext()

  // Handle
  const handleClickListSubject = (data) => {
    setDataSubject(data)
    setIsShowData(true)
    setDataSubjectinit(data)
    setIsUpdate(false)
  }

  const handleModal = (name) => {
    setOpen(true)
    setBtnName(name)
  }

  //Api
  useEffect(() => {
    fetchDataSubject()
  }, [])

  const fetchDataSubject = async () => {
    let res = await getDataSubject(token)

    if (res.status === true) {
      setListSubject(res.data)
    }
    if (res.status === false) {
      toast.error(res.msg)
    }
  }

  // Show list subject
  const showListSubject = () => {
    return (
      <ul className="border-t-2 border-primary ">
        {listSubject && listSubject.length > 0 ? (
          listSubject.map((item, index) => {
            return (
              <li
                className="flex items-center my-2 ml-2 cursor-pointer hover:text-primary"
                key={index}
                onClick={() => handleClickListSubject(item)}
              >
                <SvgDocumentPlus />
                {item.subject_name}
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
          <span className="font-semibold">DANH SÁCH MÔN HỌC</span>
        </div>
        <div className="p-5 font-bold">
          <Button
            name="add-subject"
            className="border-emerald-600 bg-emerald-600"
            onClick={() => handleModal('add-subject')}
            text="Thêm Môn Học"
            Svg={SvgPlus}
          />

          <div className="text-gray-900">
            <div className="mb-5">{showListSubject()}</div>
          </div>
        </div>
      </div>

      <div className="w-2/3 border bg-white border-primary">
        <div className="flex items-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <SvgInfo />
          <span className="font-semibold">
            {isShowData ? dataSubject?.subject_name?.toUpperCase() : 'CHỌN MÔN ĐỂ XEM THÔNG TIN'}
          </span>
        </div>

        <div className="max-h-full p-5 font-bold">
          <h1 className="text-xl text-gray-900">{isShowData ? 'Thông Tin Chung' : ''}</h1>
          {isShowData && (
            <div className="flex flex-col mt-10">
              <InfoSubject
                dataSubject={dataSubject}
                setDataSubject={setDataSubject}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                handleModal={handleModal}
                dataSubjectinit={dataSubjectinit}
                fetchDataSubject={fetchDataSubject}
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
        dataSubject={dataSubject}
        fetchDataSubject={fetchDataSubject}
      />
    </div>
  )
}
