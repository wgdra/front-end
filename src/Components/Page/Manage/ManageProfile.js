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
import { toast } from 'react-toastify'

export default function ManageProfile() {
  const [isUpdate, setIsUpdate] = useState(false)

  const [dataProfile, setDataProfile] = useState('')
  const [dataProfileInit, setDataProfileInit] = useState('')

  const { token, currentUser } = useAppContext()

  // Validation
  const [isValidate, setIsValidate] = useState(false)

  const transformFullName = (fullName) => {
    return fullName.replace(/\s+/g, ' ')
  }
  const schema = yup.object().shape({
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải trên 6 ký tự'),
    full_name: yup
      .string()
      .required('Vui lòng nhập tên')
      .trim()
      .transform(transformFullName)
      .min(3, 'Vui lòng nhập đầy đủ họ tên'),
    email: yup.string().trim().required('Vui lòng nhập email').email('Vui lòng nhập đúng email'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Số điện thoại phải gồm 10 chữ số.')
      .required('Số điện thoại không được để trống'),
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
    setDataProfile(res.data)
    setDataProfileInit(res.data)
  }

  // Handle Update
  const handleUpdateProfile = async (data) => {
    console.log('data', data)
    if (data && currentUser.role === 1) {
      let req = await putDataUser(
        data.id,
        data.username,
        data.full_name,
        data.role,
        data.subject_id ?? null,
        data.email,
        data.phone,
        token
      )

      if (req.status === 200) {
        toast.success('Chỉnh sửa thành công')
        setIsUpdate(false)
        fetchDataProfile()
      } else {
        toast.error('Có lỗi !!!')
        setIsUpdate(false)
      }
    }
  }

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
          <span className="text-2xl font-bold">{dataProfileInit.full_name?.toUpperCase()}</span>
        </div>
      </div>

      <div className="w-2/3 border bg-white border-primary">
        <div className="flex items-center justify-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <span className="font-semibold">THÔNG TIN CHI TIẾT</span>
        </div>

        <div className="max-h-full p-5 font-bold">
          <form
            id="contact-form"
            className="text-gray-900 text-lg bg-white shadow-md rounded px-8"
            onSubmit={handleSubmit(handleUpdateProfile)}
            noValidate
          >
            <div className="mb-10 flex items-center">
              <label className="block w-1/5 font-bold">
                Mã {dataProfile.role === 0 ? 'Admin' : 'Giảng Viên'}
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
              <label className="block w-1/5 font-bold">Mật Khẩu</label>
              <Controller
                name="password"
                control={control}
                defaultValue={dataProfile.password}
                render={({ field }) => (
                  <div className="relative w-4/5">
                    <input
                      name="password"
                      type="password"
                      value={dataProfile.password}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['password'] && isValidate && isUpdate ? 'border border-red-500' : '',
                        'shadow w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, password: e.target.value })
                      }}
                      errors={errors}
                      register={register}
                    />
                    {errors['password'] && isValidate && isUpdate && (
                      <span className="text-[#fe0001] absolute bottom-[-30px] left-0">
                        {errors['password'].message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-10 flex items-center">
              <label className="block w-1/5 font-bold">
                Tên {dataProfile.role === 0 ? 'Admin' : 'Giảng Viên'}
              </label>
              <Controller
                name="full_name"
                control={control}
                defaultValue={dataProfile.full_name}
                render={({ field }) => (
                  <div className="relative w-4/5">
                    <input
                      name="full_name"
                      type="text"
                      value={dataProfile.full_name}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['full_name'] && isValidate && isUpdate
                          ? 'border border-red-500'
                          : '',
                        'shadow w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, full_name: e.target.value })
                      }}
                      errors={errors}
                      register={register}
                    />
                    {errors['full_name'] && isValidate && isUpdate && (
                      <span className="text-[#fe0001] absolute bottom-[-30px] left-0">
                        {errors['full_name'].message}
                      </span>
                    )}
                  </div>
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
                  <div className="relative w-4/5">
                    <input
                      name="phone"
                      type="number"
                      value={dataProfile.phone}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['phone'] && isValidate && isUpdate ? 'border border-red-500' : '',
                        'shadow w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, phone: e.target.value })
                      }}
                      errors={errors}
                      register={register}
                    />
                    {errors['phone'] && isValidate && isUpdate && (
                      <span className="text-[#fe0001] absolute bottom-[-30px] left-0">
                        {errors['phone'].message}
                      </span>
                    )}
                  </div>
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
                  <div className="relative w-4/5">
                    <input
                      name="email"
                      type="text"
                      value={dataProfile.email}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['email'] && isValidate && isUpdate ? 'border border-red-500' : '',
                        'shadow w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, email: e.target.value })
                      }}
                      errors={errors}
                      register={register}
                    />
                    {errors['email'] && isValidate && isUpdate && (
                      <span className="text-[#fe0001] absolute bottom-[-30px] left-0">
                        {errors['email'].message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            {!isUpdate ? (
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
                    setIsValidate(false)
                    setDataProfile(dataProfileInit)
                  }}
                  text="Hủy"
                />
                <Button
                  type="submit"
                  name="update-profile"
                  className="rounded-md bg-emerald-600"
                  text="Lưu"
                  onClick={() => setIsValidate(true)}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
