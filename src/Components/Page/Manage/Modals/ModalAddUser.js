import { useRef } from 'react'
import { toast } from 'react-toastify'
import { postDataUser } from '../../../../services/apiService'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputWithValidation from '../../../ui/InputWithValidation'
import { yupResolver } from '@hookform/resolvers/yup'

export default function ModalAddUser(props) {
  const { setOpen, fetchDataUser } = props
  const cancelButtonRef = useRef(null)

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

  const onSubmitHandler = async (data) => {
    if (data) {
      await postDataUser(
        data.username,
        data.password,
        data.fullName,
        data.role,
        data.subject_id,
        data.email,
        data.phone
      )
      toast.success('Thêm mới thành công')
      setOpen(false)
      fetchDataUser()
    }
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-2">Thêm người dùng</h1>
      <form
        className="text-gray-900 text-lg font-medium bg-white shadow-md rounded p-8"
        id="contact-form"
        method="post"
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
      >
        <div className="mb-5">
          <label className="block mb-2">Tên người dùng</label>
          <InputWithValidation
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Mật khẩu</label>
          <InputWithValidation
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            type="password"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Họ và Tên</label>
          <InputWithValidation
            name="fullName"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Môn giảng dạy</label>
          <InputWithValidation
            name="subject_id"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Email</label>
          <InputWithValidation
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            type="email"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Số Điện Thoại</label>
          <InputWithValidation
            name="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            type="number"
          />
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            id="contact-submit"
            type="submit"
            name="contact-send"
            className={clsx(
              'inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto'
            )}
          >
            Lưu
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
            ref={cancelButtonRef}
          >
            Hủy
          </button>
        </div>
      </form>
    </>
  )
}
