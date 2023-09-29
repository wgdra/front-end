import { useRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  postDataRoom,
  postTimeTable,
  getDataOneRoom,
  getDataOneSession,
  getDataOneSubject,
} from '../../../../services/apiService'
import clsx from 'clsx'
import { useAppContext } from '../../../../context/UserContext'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputWithValidation from '../../../ui/InputWithValidation'
import { yupResolver } from '@hookform/resolvers/yup'

export default function ModalAddTimeTable(props) {
  const { setOpen, dataForm, fetchDataTable } = props

  const [data, setData] = useState({
    dataOneRoom: '',
    dataOneSession: '',
    dataOneSubject: '',
  })

  const { token, currentUser } = useAppContext()

  const cancelButtonRef = useRef(null)

  const schema = yup.object().shape({})

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
    fetchDataOneRoom()
    fetchDataOneSession()
    fetchDataOneSubject()
  }, [])

  const fetchDataOneRoom = async () => {
    let res = await getDataOneRoom(Number(dataForm.id_classRoom), token)

    if (res.status === true) {
      setData((prev) => ({
        ...prev,
        dataOneRoom: res.data,
      }))
    } else {
      return toast.error(res.msg)
    }
  }

  const fetchDataOneSession = async () => {
    let res = await getDataOneSession(Number(dataForm.id_session), token)

    if (res.status === true) {
      setData((prev) => ({
        ...prev,
        dataOneSession: res.data,
      }))
    } else {
      return toast.error(res.msg)
    }
  }

  const fetchDataOneSubject = async () => {
    let res = await getDataOneSubject(dataForm.dataOneUser.subject_id, token)

    if (dataForm.dataOneUser.role === 1) {
      if (res.status === true) {
        setData((prev) => ({
          ...prev,
          dataOneSubject: res.data,
        }))
      } else {
        return toast.error(res.msg)
      }
    }
    if (dataForm.dataOneUser.role === 0) {
      return
    }
  }

  // Submit form

  const onSubmitHandler = async (data) => {
    if (data) {
      let req = await postTimeTable(
        Number(dataForm.id_session),
        dataForm.dataOneUser.subject_id,
        Number(dataForm.id_classRoom),
        new Date(dataForm.date),
        currentUser.id,
        data.status,
        token
      )
      if (req.status === true) {
        toast.success('Đăng ký thành công, vui lòng đợi xét duyệt')
        setOpen(false)
        fetchDataTable()
      } else {
        return toast.error(req.msg)
      }
    }
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
        <div className="mb-8">
          <label className="block mb-2">Tên Phòng</label>
          <InputWithValidation
            name="classroom_id"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            placeholder={data.dataOneRoom.classroom_name}
            disabled
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2">Ca</label>
          <InputWithValidation
            name="session_id"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            placeholder={data.dataOneSession.session_name}
            disabled
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2">Tên Giảng Viên</label>
          <InputWithValidation
            name="teacher_id"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            placeholder={dataForm.dataOneUser.full_name}
            disabled
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2">Môn Dạy</label>
          <InputWithValidation
            name="subject_id"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            placeholder={data.dataOneSubject.subject_name}
            disabled
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2">Thời Gian</label>
          <InputWithValidation
            name="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
            placeholder={dataForm.date}
            disabled
          />
        </div>

        <div className="bg-gray-50 pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end">
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
            Lưu
          </button>
        </div>
      </form>
    </>
  )
}
