import { useEffect, useState } from 'react'
import Modal from './Modals/Modal'
import { toast } from 'react-toastify'
import { getDataSubject, putDataSubject } from '../../../services/apiService'
import { Button } from '../../ui/Button'
import { SvgDocumentPlus, SvgInfo, SvgList, SvgMinus, SvgPencilUpdate, SvgPlus } from '../../ui/Svg'
import InforSubject from './InforSubject'

export default function ManageSubject() {
  const [open, setOpen] = useState(false)
  const [btnName, setBtnName] = useState('')

  const [listSubject, setListSubject] = useState('')
  const [dataSubjectinit, setDataSubjectinit] = useState('')
  const [dataSubject, setDataSubject] = useState('')

  const [isShowData, setIsShowData] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  //Handle

  const handleClickListSubject = (data) => {
    setDataSubject(data)
    setIsShowData(true)
    setDataSubjectinit(data)
  }

  const handleModal = (name) => {
    setOpen(true)
    setBtnName(name)
  }

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

  //Api
  useEffect(() => {
    fetchDataSubject()
  }, [])

  const fetchDataSubject = async () => {
    let res = await getDataSubject()
    setListSubject(res)
  }

  const handleUpdateSubject = async () => {
    await putDataSubject(dataSubject.id, dataSubject.subject_name)
    toast.success('Cập nhật thành công')
    setIsUpdate(false)
    fetchDataSubject()
  }

  return (
    <div className="flex h-full ">
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
            text="Thêm Giảng Viên"
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
            THÔNG TIN MÔN {dataSubject?.subject_name?.toUpperCase()}
          </span>
        </div>

        <div className="p-5 font-bold">
          <h1 className="text-xl text-gray-900">Thông Tin Chung</h1>

          {isShowData && (
            <div className="mt-10">
              <InforSubject
                dataSubject={dataSubject}
                setDataSubject={setDataSubject}
                isUpdate={isUpdate}
              />
              <div className="flex justify-end">
                {!isUpdate ? (
                  <>
                    <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
                      <Button
                        name="delete-subject"
                        className="border-red-600 bg-red-600"
                        onClick={() => handleModal('delete-subject')}
                        text="Xóa Môn Học"
                        Svg={SvgMinus}
                      />
                      <Button
                        name="update-subject"
                        className="border-yellow-600 bg-yellow-600"
                        onClick={() => setIsUpdate(true)}
                        text="Chỉnh sửa"
                        Svg={SvgPencilUpdate}
                      />
                    </div>
                  </>
                ) : (
                  <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
                    <Button
                      className="rounded-md bg-gray-600"
                      onClick={() => {
                        setIsUpdate(false)
                        setDataSubject(dataSubjectinit)
                      }}
                      text="Hủy"
                    />
                    <Button
                      name="update-subject"
                      className="rounded-md bg-emerald-600"
                      text="Lưu"
                      onClick={() => handleUpdateSubject()}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        setIsShowData={setIsShowData}
        name={btnName}
        dataSubject={dataSubject}
        fetchDataSubject={fetchDataSubject}
      />
    </div>
  )
}
