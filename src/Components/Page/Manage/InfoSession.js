import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SvgMinus, SvgPencilUpdate } from '../../ui/Svg'
import { putDataSession } from '../../../services/apiService'
import { toast } from 'react-toastify'
import { Button } from '../../ui/Button'
import { useState } from 'react'

const InfoSession = (props) => {
  const {
    dataSession,
    setDataSession,
    isUpdate,
    setIsUpdate,
    dataSessioninit,
    handleModal,
    fetchDataSession,
  } = props

  // Validate
  const [isValidate, setIsValidate] = useState(false)

  const schema = yup.object().shape({
    sessionName: yup.string().trim().required('Vui lòng nhập ca học'),
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
  const handleUpdateSession = async (data) => {
    if (data) {
      await putDataSession(
        dataSession.id,
        dataSession.session_name,
        dataSession.time_start,
        dataSession.time_end
      )
      toast.success('Cập nhật thành công')
      setIsUpdate(false)
      fetchDataSession()
    }
  }

  return (
    <form
      id="contact-form"
      className="text-gray-900 text-lg bg-white shadow-md rounded px-8 pt-8"
      onSubmit={handleSubmit(handleUpdateSession)}
      noValidate
    >
      <div className="mb-10">
        <label className="block font-bold mb-2">Mã Ca Học</label>
        <Controller
          name="id"
          control={control}
          defaultValue={dataSession.id}
          render={({ field }) => (
            <input
              {...field}
              className="shadow text-[#9CA3AF] appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="id"
              type="text"
              value={dataSession.id}
              disabled
            />
          )}
        />
      </div>
      <div className="mb-10">
        <label className="block font-bold mb-2">Tên Ca Học</label>
        <Controller
          name="sessionName"
          control={control}
          defaultValue={dataSession.session_name}
          render={({ field }) => (
            <>
              <input
                name="sessionName"
                type="text"
                value={dataSession.session_name}
                className={clsx(
                  !isUpdate ? 'text-[#9CA3AF]' : '',
                  errors['sessionName'] && isValidate && isUpdate ? 'border border-red-500' : '',
                  'shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                )}
                disabled={!isUpdate}
                onChange={(e) => {
                  field.onChange(e)
                  setDataSession({ ...dataSession, session_name: e.target.value })
                }}
                errors={errors}
                register={register}
              />
              {errors['sessionName'] && isValidate && isUpdate && (
                <label className="text-[#fe0001]">{errors['sessionName'].message}</label>
              )}
            </>
          )}
        />
      </div>
      <div className="mb-10">
        <label className="block font-bold mb-2">Thời Gian Bắt Đầu</label>
        <Controller
          name="timeStart"
          control={control}
          defaultValue={dataSession.time_start}
          render={({ field }) => (
            <>
              <input
                name="timeStart"
                type={isUpdate ? 'time' : 'text'}
                value={dataSession.time_start}
                className={clsx(
                  !isUpdate ? 'text-[#9CA3AF]' : '',
                  errors['timeStart'] && isValidate && isUpdate ? 'border border-red-500' : '',
                  'shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                )}
                disabled={!isUpdate}
                onChange={(e) => {
                  field.onChange(e)
                  setDataSession({ ...dataSession, time_start: e.target.value })
                }}
                errors={errors}
                register={register}
              />
              {errors['timeStart'] && isValidate && isUpdate && (
                <label className="text-[#fe0001]">{errors['timeStart'].message}</label>
              )}
            </>
          )}
        />
      </div>
      <div className="mb-10">
        <label className="block font-bold mb-2">Thời Gian Kết Thúc</label>
        <Controller
          name="timeEnd"
          control={control}
          defaultValue={dataSession.time_end}
          render={({ field }) => (
            <>
              <input
                name="timeEnd"
                type={isUpdate ? 'time' : 'text'}
                value={dataSession.time_end}
                className={clsx(
                  !isUpdate ? 'text-[#9CA3AF]' : '',
                  errors['timeEnd'] && isValidate && isUpdate ? 'border border-red-500' : '',
                  'shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                )}
                disabled={!isUpdate}
                onChange={(e) => {
                  field.onChange(e)
                  setDataSession({ ...dataSession, time_end: e.target.value })
                }}
                errors={errors}
                register={register}
              />
              {errors['timeEnd'] && isValidate && isUpdate && (
                <label className="text-[#fe0001]">{errors['timeEnd'].message}</label>
              )}
            </>
          )}
        />
      </div>

      {!isUpdate ? (
        <>
          <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
            <Button
              name="delete-session"
              type="button"
              className="border-red-600 bg-red-600"
              onClick={() => handleModal('delete-session')}
              text="Xóa Ca Học"
              Svg={SvgMinus}
            />
            <Button
              name="update-session"
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
              setDataSession(dataSessioninit)
              setIsValidate(false)
            }}
            text="Hủy"
          />
          <Button
            type="submit"
            name="update-session"
            className="rounded-md bg-emerald-600"
            text="Lưu"
            onClick={() => setIsValidate(true)}
          />
        </div>
      )}
    </form>
  )
}

export default InfoSession
