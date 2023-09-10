import { useEffect, useState } from 'react'
import Modal from './Modals/Modal'
import { getDataUser } from '../../../services/apiService'
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
  }, [])

  const fetchDataUser = async () => {
    let res = await getDataUser()
    setDataUser(res)
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
                  fetchDataUser={fetchDataUser}
                />
                {/* <div className="flex justify-end">
                  {!isUpdate ? (
                    <>
                      <div className="bg-gray-50 pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
                        <Button
                          name="delete-user"
                          className="border-red-600 bg-red-600"
                          onClick={() => handleModal('delete-user')}
                          text="Xóa giảng viên"
                          Svg={SvgMinus}
                        />
                        <Button
                          name="update-user"
                          className="border-yellow-600 bg-yellow-600"
                          onClick={() => setIsUpdate(true)}
                          text="Chỉnh sửa"
                          Svg={SvgPencilUpdate}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-50 pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
                      <Button
                        className="rounded-md bg-gray-600"
                        onClick={() => {
                          setIsUpdate(false)
                          setInforUser(dataUserinit)
                        }}
                        text="Hủy"
                      />
                      <Button
                        name="update-user"
                        className="rounded-md bg-emerald-600"
                        onClick={() => handleUpdateUser()}
                        text="Lưu"
                      />
                    </div>
                  )}
                </div> */}
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
      />
    </div>
  )
}
