import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SvgMinus, SvgPencilUpdate } from '../../ui/Svg'
import { putDataUser } from '../../../services/apiService'
import { toast } from 'react-toastify'
import { Button } from '../../ui/Button'
import { useState } from 'react'

const InforUser = (props) => {
  const {
    inforUser,
    setInforUser,
    isUpdate,
    setIsUpdate,
    handleModal,
    dataUserinit,
    fetchDataUser,
  } = props

  // Validate
  const [isValidate, setIsValidate] = useState(false)

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .trim()
      .required('Vui lòng nhập tên')
      .min(3, 'Vui lòng nhập đầy đủ họ tên'),
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

  const handleUpdateUser = async (data) => {
    console.log('data update', data)
    if (data) {
      await putDataUser(
        data.id,
        data.username,
        data.full_name,
        data.subject_id,
        data.role,
        data.email,
        data.phone
      )
      console.log('data update id', data.id)

      toast.success('Chỉnh sửa thành công')
      setIsUpdate(false)
      fetchDataUser()
    }
  }

  return (
    <form
      id="form-update"
      className="text-gray-900 text-lg bg-white shadow-md rounded px-8 pt-8"
      onSubmit={handleSubmit(handleUpdateUser)}
      noValidate
    >
      <div className="mb-10 flex items-center">
        <label className="block w-1/5 font-bold">Mã Giảng Viên</label>
        <Controller
          name="id"
          control={control}
          defaultValue={inforUser.id}
          render={({ field }) => (
            <input
              {...field}
              className="shadow w-4/5 text-[#9CA3AF] appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="id"
              type="text"
              value={inforUser.id}
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
          defaultValue={inforUser.username}
          render={({ field }) => (
            <input
              {...field}
              className="shadow w-4/5 text-[#9CA3AF] appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={inforUser.username}
              disabled
            />
          )}
        />
      </div>
      <div className="mb-10 flex flex-wrap items-center">
        <label className="block w-1/5 font-bold">Tên Giảng Viên</label>
        <Controller
          name="fullName"
          control={control}
          defaultValue={inforUser.full_name}
          render={({ field }) => (
            <div className="relative w-4/5">
              <input
                name="fullName"
                type="text"
                value={inforUser.full_name}
                className={clsx(
                  !isUpdate ? 'text-[#9CA3AF]' : '',
                  errors['fullName'] && isValidate && isUpdate ? 'border border-red-500' : '',
                  'shadow w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                )}
                disabled={!isUpdate}
                onChange={(e) => {
                  field.onChange(e)
                  setInforUser({ ...inforUser, full_name: e.target.value })
                }}
                errors={errors}
                register={register}
              />
              {errors['fullName'] && isValidate && isUpdate && (
                <span className="text-[#fe0001] absolute bottom-[-30px] left-0">
                  {errors['fullName'].message}
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
          defaultValue={inforUser.role}
          render={({ field }) => (
            <input
              {...field}
              className="shadow w-4/5 text-[#9CA3AF] appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              type="text"
              value={inforUser.role}
              disabled
            />
          )}
        />
      </div>

      <div className="mb-10 flex items-center">
        <label className="block w-1/5 font-bold">Bộ Môn</label>
        <Controller
          name="subjectId"
          control={control}
          defaultValue={inforUser.subject_id}
          render={({ field }) => (
            <input
              {...field}
              className="shadow w-4/5 text-[#9CA3AF] appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              type="text"
              value={inforUser.subject_id}
              disabled
            />
          )}
        />
      </div>
      <div className="mb-10 flex items-center">
        <label className="block w-1/5 font-bold">Email</label>
        <Controller
          name="email"
          control={control}
          defaultValue={inforUser.email}
          render={({ field }) => (
            <div className="relative w-4/5">
              <input
                name="email"
                type="email"
                value={inforUser.email}
                className={clsx(
                  !isUpdate ? 'text-[#9CA3AF]' : '',
                  errors['email'] && isValidate && isUpdate ? 'border border-red-500' : '',
                  'shadow w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                )}
                disabled={!isUpdate}
                onChange={(e) => {
                  field.onChange(e)
                  setInforUser({ ...inforUser, email: e.target.value })
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
      <div className="mb-10 flex items-center">
        <label className="block w-1/5 font-bold">SĐT Liên Hệ</label>
        <Controller
          name="phone"
          control={control}
          defaultValue={inforUser.phone}
          render={({ field }) => (
            <div className="relative w-4/5">
              <input
                name="phone"
                type="number"
                value={inforUser.phone}
                className={clsx(
                  !isUpdate ? 'text-[#9CA3AF]' : '',
                  errors['phone'] && isValidate && isUpdate ? 'border border-red-500' : '',
                  'shadow w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                )}
                disabled={!isUpdate}
                onChange={(e) => {
                  field.onChange(e)
                  setInforUser({ ...inforUser, phone: e.target.value })
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
      {!isUpdate ? (
        <>
          <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
            <Button
              name="delete-user"
              type="button"
              className="border-red-600 bg-red-600"
              onClick={() => handleModal('delete-user')}
              text="Xóa Giảng Viên"
              Svg={SvgMinus}
            />
            <Button
              name="update-user"
              className="border-emerald-600 bg-emerald-600"
              onClick={() => {
                setIsUpdate(true)
                setIsValidate(false)
              }}
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
              setIsValidate(false)
              setInforUser(dataUserinit)
            }}
            text="Hủy"
          />
          <Button
            type="submit"
            name="update-user"
            className="rounded-md bg-emerald-600"
            text="Lưu"
            onClick={() => setIsValidate(true)}
          />
        </div>
      )}
    </form>
  )
}

export default InforUser
