import { useRef } from 'react'
import { toast } from 'react-toastify'
import { postDataSubject } from '../../../../services/apiService'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputWithValidation from '../../../ui/InputWithValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppContext } from '../../../../context/UserContext'

export default function ModalAddSubject(props) {
  const { setOpen, fetchDataSubject } = props

  const { token, currentUser } = useAppContext()

  const schema = yup.object().shape({
    subjectName: yup.string().trim().required('Vui lòng nhập tên môn học'),
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

  const onSubmitHandler = async (data) => {
    if (data && currentUser.role === 0) {
      let req = await postDataSubject(data.subjectName, token)

      if (req.status === true) {
        toast.success(req.msg)
        setOpen(false)
        fetchDataSubject()
      } else {
        toast.error(req.msg)
        setOpen(false)
      }
    }
    if (data && currentUser.role === 1) {
      toast.error('Bạn không có quyền thêm môn học')
    }

    reset()
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-2">Thêm môn học mới</h1>
      <form
        id="contact-form"
        method="post"
        className="text-gray-900 text-lg font-medium bg-white shadow-md rounded p-8"
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
      >
        <div className="mb-8">
          <label className="block mb-2">Tên Môn Học</label>
          <InputWithValidation
            name="subjectName"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            errors={errors}
            register={register}
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
