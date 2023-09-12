import AdminProfile from '../../../assets/Admin-Profile.png'
import { useEffect, useState } from 'react'
import { Button } from '../../ui/Button'
import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SvgPencilUpdate } from '../../ui/Svg'
import { getDataOneUser } from '../../../services/apiService'

export default function ManageProfile() {
  const [isUpdate, setIsUpdate] = useState(false)
  const [dataProfile, setDataProfile] = useState('')

  const schema = yup.object().shape({
    validate_text: yup
      .string()
      .trim()
      .required('Không được để trống')
      .min(3, 'Vui lòng nhập trên 3 ký tự'),
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
  useEffect(() => {
    fetchDataProfile()
  }, [])

  const fetchDataProfile = async () => {
    let res = await getDataOneUser()
    setDataProfile(res)
  }
  console.log(dataProfile)

  return (
    <div className="flex min-h-[80vh]">
      <div className="w-1/3 mr-10 border bg-white border-primary">
        <div className="flex items-center justify-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <span className="font-semibold">HỒ SƠ</span>
        </div>
        <div className="flex flex-col items-center p-8">
          <div className="w-[70%] mb-8">
            <img className="w-full h-full" src={AdminProfile} />
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
            className="text-gray-900 text-lg bg-white shadow-md rounded px-8 pt-8"
            // onSubmit={handleSubmit(handleUpdateRoom)}
            noValidate
          >
            <div className="mb-10 flex items-center">
              <label className="block w-1/5 font-bold">Mã Giảng Viên</label>
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
                  <>
                    <input
                      name="username"
                      type="text"
                      value={dataProfile.username}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['classroomName'] ? 'border border-red-500' : '',
                        'shadow w-4/5 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, username: e.target.value })
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
              <label className="block w-1/5 font-bold">Mật Khẩu</label>
              <Controller
                name="password"
                control={control}
                defaultValue={dataProfile.password}
                render={({ field }) => (
                  <>
                    <input
                      name="password"
                      type="password"
                      value={dataProfile.password}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['classroomName'] ? 'border border-red-500' : '',
                        'shadow w-4/5 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, password: e.target.value })
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
              <label className="block w-1/5 font-bold">Tên Giảng Viên</label>
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
                p={dataProfile.role}
                render={({ field }) => (
                  <>
                    <input
                      name="role"
                      type="text"
                      value={dataProfile.role}
                      className="shadow text-[#9CA3AF] w-4/5 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      disabled
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
              <label className="block w-1/5 font-bold">Bộ Môn</label>
              <Controller
                name="subject"
                control={control}
                defaultValue={dataProfile.subject_id}
                render={({ field }) => (
                  <>
                    <input
                      name="subject"
                      type="text"
                      value={dataProfile.subject_id}
                      className={clsx(
                        !isUpdate ? 'text-[#9CA3AF]' : '',
                        errors['classroomName'] ? 'border border-red-500' : '',
                        'shadow w-4/5 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      disabled={!isUpdate}
                      onChange={(e) => {
                        field.onChange(e)
                        setDataProfile({ ...dataProfile, subject_id: e.target.value })
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
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
