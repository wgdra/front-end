import AdminProfile from '../../../assets/Admin-Profile.png'
import UserProfile from '../../../assets/User-Profile.png'
import { useEffect, useState } from 'react'
import { Button } from '../../ui/Button'
import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SvgPencilUpdate } from '../../ui/Svg'
import { getDataOneUser, putDataUser } from '../../../services/apiService'
import { useAppContext } from '../../../context/UserContext'

export default function ManageProfile() {
  const [isUpdate, setIsUpdate] = useState(false)
  const [dataProfile, setDataProfile] = useState('')

  const { currentUser } = useAppContext()

  const transformFullName = (fullName) => {
    return fullName.replace(/\s+/g, ' ')
  }
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Vui lòng nhập tên')
      .trim()
      .transform(transformFullName)
      .min(3, 'Vui lòng nhập đầy đủ họ tên'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải trên 6 ký tự'),
    email: yup.string().trim().required('Vui lòng nhập email').email('Vui lòng nhập đúng email'),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Handle

  // Api

  //GET one user
  useEffect(() => {
    fetchDataProfile()
  }, [])

  const fetchDataProfile = async () => {
    let res = await getDataOneUser(currentUser.id)
    setDataProfile(res)
  }

  // Handle Update
  // const handleUpdateProfile = async (data) => {
  //   console.log('check submit', data)
  //   if (data) {
  //     await putDataUser(
  //       data.id,
  //       data.username,
  //       data.full_name,
  //       data.subject_id ?? null,
  //       data.role,
  //       data.email,
  //       data.phone
  //     )
  //     // toast.success('Chỉnh sửa thành công')
  //     setIsUpdate(false)
  //     // fetchDataUser()
  //   }
  // }

  return (
    <div className="flex min-h-[80vh]">
      <div className="w-1/3 mr-10 border bg-white border-primary">
        <div className="flex items-center justify-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <span className="font-semibold">HỒ SƠ</span>
        </div>
        <div className="flex flex-col items-center p-8">
          <div className="w-[70%] mb-8">
            {dataProfile?.role === 1 ? (
              <img className="w-full h-full" src={UserProfile} />
            ) : (
              <img className="w-full h-full" src={AdminProfile} />
            )}
          </div>
          <span className="text-2xl font-bold">{dataProfile?.full_name?.toUpperCase()}</span>
        </div>
      </div>

      <div className="w-2/3 border bg-white border-primary">
        <div className="flex items-center justify-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <span className="font-semibold">THÔNG TIN CHI TIẾT</span>
        </div>

        <div className="max-h-full p-5 font-bold">
          <form
            id="contact-form"
            className="text-gray-900 text-lg bg-white shadow-md rounded px-8 py-8"
            // onSubmit={handleSubmit(handleUpdateProfile)}
            noValidate
          >
            <div className="mb-10 flex items-center">
              <label className="block w-1/5 font-bold">
                Mã {dataProfile?.role === 0 ? 'Admin' : 'Giảng Viên'}
              </label>
              <Controller
                name="id"
                control={control}
                defaultValue={dataProfile.id}
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow w-4/5 text-[#9CA3AF] appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="id"
                    type="text"
                    value={dataProfile.id}
                    disabled
                  />
                )}
              />
            </div>
            <div className="mb-10 flex items-center">
              <label className="block w-1/5 font-bold">Tên Người Dùng</label>
              <Controller
                name="username"
                control={control}
                defaultValue={dataProfile.username}
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow w-4/5 text-[#9CA3AF] appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    value={dataProfile.username}
                    disabled
                  />
                )}
              />
            </div>

            <div className="mb-10 flex items-center">
              <label className="block w-1/5 font-bold">
                Tên {dataProfile?.role === 0 ? 'Admin' : 'Giảng Viên'}
              </label>
              <Controller
                name="fullName"
                control={control}
                defaultValue={dataProfile.full_name}
                render={({ field }) => (
                  <>
                    <input
                      name="fullName"
                      type="text"
                      value={dataProfile.full_name}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['classroomName'] ? 'border border-red-500' : '',
                        'shadow w-4/5 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, full_name: e.target.value })
                      }}
                      errors={errors}
                      register={register}
                    />
                    {errors['classroomName'] && (
                      <label className="text-[#fe0001]">{errors['classroomName'].message}</label>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-10 flex items-center">
              <label className="block w-1/5 font-bold">Chức Vụ</label>
              <Controller
                name="role"
                control={control}
                defaultValue={dataProfile.role}
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow w-4/5 text-[#9CA3AF] appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="role"
                    type="text"
                    value={dataProfile.role === 0 ? 'Admin' : 'Giảng Viên'}
                    disabled
                  />
                )}
              />
            </div>

            {dataProfile && dataProfile?.role === 1 && (
              <div className="mb-10 flex items-center">
                <label className="block w-1/5 font-bold">Bộ Môn</label>
                <Controller
                  name="subject_id"
                  control={control}
                  defaultValue={dataProfile.subject_id}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="shadow w-4/5 text-[#9CA3AF] appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="subject_id"
                      type="text"
                      value={dataProfile.subject_id}
                      disabled
                    />
                  )}
                />
              </div>
            )}

            <div className="mb-10 flex items-center">
              <label className="block w-1/5 font-bold">Số Điện Thoại</label>
              <Controller
                name="phone"
                control={control}
                defaultValue={dataProfile.phone}
                render={({ field }) => (
                  <>
                    <input
                      name="phone"
                      type="text"
                      value={dataProfile.phone}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['phone'] ? 'border border-red-500' : '',
                        'shadow w-4/5 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, phone: e.target.value })
                      }}
                      errors={errors}
                      register={register}
                    />
                    {errors['phone'] && (
                      <label className="text-[#fe0001]">{errors['phone'].message}</label>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-10 flex items-center">
              <label className="block w-1/5 font-bold">Email</label>
              <Controller
                name="email"
                control={control}
                defaultValue={dataProfile.email}
                render={({ field }) => (
                  <>
                    <input
                      name="email"
                      type="text"
                      value={dataProfile.email}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['email'] ? 'border border-red-500' : '',
                        'shadow w-4/5 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, email: e.target.value })
                      }}
                      errors={errors}
                      register={register}
                    />
                    {errors['email'] && (
                      <label className="text-[#fe0001]">{errors['email'].message}</label>
                    )}
                  </>
                )}
              />
            </div>
            {/* {!isUpdate ? (
              <>
                <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
                  <Button
                    name="update-profile"
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
                  name="delete-profile"
                  className="rounded-md bg-gray-600"
                  onClick={() => {
                    setIsUpdate(false)
                  }}
                  text="Hủy"
                />
                <Button
                  type="submit"
                  name="update-profile"
                  className="rounded-md bg-emerald-600"
                  text="Lưu"
                />
              </div>
            )} */}
          </form>
        </div>
      </div>
    </div>
  )
}
