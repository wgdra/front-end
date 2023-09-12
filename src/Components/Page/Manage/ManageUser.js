import { useEffect, useState } from 'react'
import Modal from './Modals/Modal'
import { getDataUser, getDataSubject } from '../../../services/apiService'
import InfoUser from './InfoUser'
import { Button } from '../../ui/Button'
import { SvgIconUser, SvgInfo, SvgList, SvgPlus } from '../../ui/Svg'

export default function ManageUser() {
  const [open, setOpen] = useState(false)
  const [btnName, setBtnName] = useState('')

  const [isShowData, setIsShowData] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  const [dataUser, setDataUser] = useState('')
  const [dataUserinit, setDataUserInit] = useState('')
  const [inforUser, setInforUser] = useState('')

  const [subjectUser, setSubjectUser] = useState()

  //Handle

  const handleClickListUser = (data) => {
    setInforUser(data)
    setIsShowData(true)
    setDataUserInit(data)
    setIsUpdate(false)
  }

  const handleModal = (name) => {
    setOpen(true)
    setBtnName(name)
  }
  //Api
  useEffect(() => {
    fetchDataUser()
    fetchDataSubject()
  }, [])

  const fetchDataUser = async () => {
    let res = await getDataUser()
    setDataUser(res)
  }

  const fetchDataSubject = async () => {
    let res = await getDataSubject()
    setSubjectUser(res)
  }

  // Show List User
  const listUser = () => {
    return (
      <ul className="border-t-2 border-primary ">
        {dataUser && dataUser.length > 0 ? (
          dataUser.map((item, index) => {
            return (
              <li
                className="flex items-center my-2 ml-2 cursor-pointer hover:text-primary"
                key={index}
                onClick={() => handleClickListUser(item)}
              >
                <SvgIconUser />
                {item.full_name}
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
          <span className="font-semibold">DANH SÁCH GIẢNG VIÊN</span>
        </div>
        <div className="p-5 font-bold">
          <Button
            name="add-user"
            className="border-emerald-600 bg-emerald-600"
            onClick={() => handleModal('add-user')}
            text="Thêm Giảng Viên"
            Svg={SvgPlus}
          />

          <div className="text-gray-900">
            <div className="mb-5">{listUser()}</div>
          </div>
        </div>
      </div>

      <div className="w-2/3 border bg-white border-primary">
        <div className="flex items-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <SvgInfo />
          <span className="font-semibold">
            {isShowData ? inforUser?.full_name?.toUpperCase() : 'CHỌN GIẢNG VIÊN ĐỂ XEM THÔNG TIN'}
          </span>
        </div>

        <div className="max-h-full p-5 font-bold">
          <h1 className="text-xl text-gray-900">{isShowData ? 'Thông Tin Giảng Viên' : ''}</h1>
          {isShowData && (
            <>
              <div className="flex flex-col mt-10">
                <InfoUser
                  inforUser={inforUser}
                  setInforUser={setInforUser}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                  handleModal={handleModal}
                  dataUserinit={dataUserinit}
                  subjectUser={subjectUser}
                  fetchDataUser={fetchDataUser}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        setIsShowData={setIsShowData}
        btnName={btnName}
        inforUser={inforUser}
        fetchDataUser={fetchDataUser}
        subjectUser={subjectUser}
      />
    </div>
  )
}
