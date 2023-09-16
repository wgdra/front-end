import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SvgMinus, SvgPencilUpdate } from '../../ui/Svg'
import { putDataSubject } from '../../../services/apiService'
import { toast } from 'react-toastify'
import { Button } from '../../ui/Button'
import { useState } from 'react'
import { useAppContext } from '../../../context/UserContext'

const InfoSubject = (props) => {
  const {
    dataSubject,
    setDataSubject,
    isUpdate,
    setIsUpdate,
    dataSubjectinit,
    handleModal,
    fetchDataSubject,
  } = props

  const { token, currentUser } = useAppContext()

  // Validate
  const [isValidate, setIsValidate] = useState(false)

  const schema = yup.object().shape({
    subject_name: yup.string().trim().required('Vui lòng nhập tên môn học'),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // handle API Update Subject
  const handleUpdateSubject = async (data) => {
    console.log('data subject', data)
    if (data && currentUser.role === 0) {
      let req = await putDataSubject(data.id, data.subject_name, token)
      if (req.status === true) {
        toast.success('Cập nhật thành công')
        setIsUpdate(false)
        fetchDataSubject()
      } else {
        toast.error(req.msg)
        setIsUpdate(false)
      }
    }
    if (data && currentUser.role === 1) {
      toast.error('Bạn không có quyền chỉnh sửa')
    }
  }

  return (
    <form
      id="contact-form"
      className="text-gray-900 text-lg bg-white shadow-md rounded px-8 pt-8"
      onSubmit={handleSubmit(handleUpdateSubject)}
      noValidate
    >
      <div className="mb-20">
        <label className="block font-bold mb-2">Mã Môn Học</label>
        <Controller
          name="id"
          control={control}
          defaultValue={dataSubject.id}
          render={({ field }) => (
            <input
              {...field}
              className="shadow text-[#9CA3AF] appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="id"
              type="text"
              value={dataSubject.id}
              disabled
            />
          )}
        />
      </div>
      <div className="mb-40">
        <label className="block font-bold mb-2">Tên Môn Học</label>
        <Controller
          name="subject_name"
          control={control}
          defaultValue={dataSubject.subject_name}
          render={({ field }) => (
            <>
              <input
                name="subject_name"
                type="text"
                value={dataSubject.subject_name}
                className={clsx(
                  !isUpdate ? 'text-[#9CA3AF]' : '',
                  errors['subject_name'] && isValidate && isUpdate ? 'border border-red-500' : '',
                  'shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                )}
                disabled={!isUpdate}
                onChange={(e) => {
                  field.onChange(e)
                  setDataSubject({ ...dataSubject, subject_name: e.target.value })
                }}
                errors={errors}
                register={register}
              />
              {errors['subject_name'] && isValidate && isUpdate && (
                <label className="text-[#fe0001]">{errors['subject_name'].message}</label>
              )}
            </>
          )}
        />
      </div>

      {!isUpdate ? (
        <>
          <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
            <Button
              name="delete-subject"
              type="button"
              className="border-red-600 bg-red-600"
              onClick={() => handleModal('delete-subject')}
              text="Xóa Môn Học"
              Svg={SvgMinus}
            />
            <Button
              name="update-subject"
              type="button"
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
              setDataSubject(dataSubjectinit)
              setIsValidate(false)
            }}
            text="Hủy"
          />
          <Button
            type="submit"
            name="update-subject"
            className="rounded-md bg-emerald-600"
            text="Lưu"
            onClick={() => setIsValidate(true)}
          />
        </div>
      )}
    </form>
  )
}

export default InfoSubject
