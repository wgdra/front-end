import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { postDataUser } from '../../../../services/apiService'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputWithValidation from '../../../ui/InputWithValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from '../../../ui/Select'
import { transformData } from '../../../../utils/transformData'
import { useAppContext } from '../../../../context/UserContext'

export default function ModalAddUser(props) {
  const { setOpen, fetchDataUser, subjectUser } = props
  const cancelButtonRef = useRef(null)

  const [dataRole] = useState([
    {
      id: 0,
      role: 'Admin',
    },
    {
      id: 1,
      role: 'Giảng Viên',
    },
  ])

  const { token, currentUser } = useAppContext()

  // Validation
  // Hàm để thực hiện biến đổi giá trị fullName
  const transformFullName = (fullName) => {
    // Thực hiện biến đổi ở đây, ví dụ: loại bỏ dấu cách thừa
    return fullName.replace(/\s+/g, ' ')
  }

  const schema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('Vui lòng nhập tên')
      .min(3, 'Vui lòng nhập đầy đủ họ tên'),
    fullName: yup
      .string()
      .required('Vui lòng nhập tên')
      .trim()
      .transform(transformFullName)
      .min(3, 'Vui lòng nhập đầy đủ họ tên'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải trên 6 ký tự'),
    email: yup.string().trim().required('Vui lòng nhập email').email('Vui lòng nhập đúng email'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Số điện thoại phải gồm 10 chữ số.')
      .required('Số điện thoại không được để trống'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Api
  const onSubmitHandler = async (data) => {
    if (data && currentUser.role === 0) {
      let req = await postDataUser(
        data.username,
        data.password,
        data.fullName,
        data.role,
        data.subject_id ?? null,
        data.phone,
        data.email,
        token
      )

      if (req.status === true) {
        toast.success(req.msg)
        setOpen(false)
        fetchDataUser()
      } else {
        toast.error(req.msg)
        setOpen(false)
      }
    }
    if (data && currentUser.role === 1) {
      toast.error('Bạn không có quyền chỉnh sửa')
      setOpen(false)
    }
    reset()
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
          <label className="block mb-2">Vai trò</label>
          <Select
            name="role"
            className="shadow appearance-auto border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            isMustChoose={true}
            options={transformData(dataRole, 'role')}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Môn dạy</label>
          <Select
            name="subject_id"
            className="shadow appearance-auto border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            options={transformData(subjectUser, 'subject_name')}
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
