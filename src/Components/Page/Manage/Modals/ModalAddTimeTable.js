import { useRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { postDataRoom, getDataOneUser, postTimeTable } from '../../../../services/apiService'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputWithValidation from '../../../ui/InputWithValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppContext } from '../../../../context/UserContext'

export default function ModalAddTimeTable(props) {
  const { setOpen, fetchListRoom } = props

  const [dataProfile, setDataProfile] = useState('')

  const { currentUser } = useAppContext()
  // Validation
  const schema = yup.object().shape({
    classroomName: yup
      .string()
      .trim()
      .required('Vui lòng nhập tên phòng')
      .min(1, 'Tên phòng phải trên 3 ký tự'),
  })

  const cancelButtonRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Api
  useEffect(() => {
    fetchDataProfile()
  }, [])

  const fetchDataProfile = async () => {
    let res = await getDataOneUser(currentUser.id)
    setDataProfile(res)
  }

  const onSubmitHandler = async (data) => {
    console.log('data', data)
    if (data) {
      await postTimeTable(
        data.sessionName,
        data.subject,
        data.classroomName,
        new Date(data.date),
        currentUser.id
      )
      toast.success('Thêm phòng thành công')
      setOpen(false)
    }

    reset()
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-2">Đăng Ký Phòng Dạy</h1>
      <form
        id="contact-form"
        method="post"
        className="text-gray-900 text-lg font-medium bg-white shadow-md rounded p-8"
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
      >
        <div className="mb-5">
          <label className="block mb-2">Phòng</label>
          <InputWithValidation
            name="classroomName"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Ca</label>
          <InputWithValidation
            name="sessionName"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Tên Giảng Viên</label>
          <InputWithValidation
            name="teacher_id"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2">Môn</label>
          <InputWithValidation
            name="subject"
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Thời gian</label>
          <InputWithValidation
            name="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
          />
        </div>
        <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end">
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
            ref={cancelButtonRef}
          >
            Hủy
          </button>
          <button
            id="contact-submit"
            type="submit"
            name="contact-send"
            className={clsx(
              'inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto'
            )}
          >
            Gửi
          </button>
        </div>
      </form>
    </>
  )
}
