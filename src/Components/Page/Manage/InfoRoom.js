import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SvgMinus, SvgPencilUpdate } from '../../ui/Svg'
import { putDataRoom } from '../../../services/apiService'
import { toast } from 'react-toastify'
import { Button } from '../../ui/Button'
import { useState } from 'react'
import { useAppContext } from '../../../context/UserContext'

const InforRoom = ({
  dataRoom,
  setDataRoom,
  isUpdate,
  setIsUpdate,
  handleModal,
  dataRoominit,
  fetchListRoom,
}) => {
  const { token, currentUser } = useAppContext()

  // Validate
  const [isValidate, setIsValidate] = useState(false)

  const schema = yup.object().shape({
    classroomName: yup
      .string()
      .trim()
      .required('Vui lòng nhập tên phòng')
      .min(3, 'Tên phòng phải trên 3 ký tự'),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Handle Update Room
  const handleUpdateRoom = async (data) => {
    if (data && currentUser.role === 0) {
      let req = await putDataRoom(dataRoom.id, dataRoom.classroom_name, dataRoom.note, token)

      if (req.status === true) {
        toast.success('Cập nhật thành công')
        setIsUpdate(false)
        fetchListRoom()
      } else {
        toast.error('Lỗi !!!')
        setIsUpdate(false)
      }
    }
    if (data && currentUser.role === 1) {
      toast.error('Bạn không có quyền chỉnh sửa')
    }
  }

  return (
    <>
      <form
        id="contact-form"
        className="text-gray-900 text-lg bg-white shadow-md rounded px-8 pt-8"
        onSubmit={handleSubmit(handleUpdateRoom)}
        noValidate
      >
        <div className="mb-10">
          <label className="block font-bold mb-2">Mã Phòng</label>
          <Controller
            name="id"
            control={control}
            defaultValue={dataRoom.id}
            render={({ field }) => (
              <input
                {...field}
                className="shadow text-[#9CA3AF] appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="id"
                type="text"
                value={dataRoom.id}
                disabled
              />
            )}
          />
        </div>
        <div className="mb-10">
          <label className="block font-bold mb-2">Tên Phòng</label>
          <Controller
            name="classroomName"
            control={control}
            defaultValue={dataRoom.classroom_name}
            render={({ field }) => (
              <>
                <input
                  name="classroomName"
                  type="text"
                  value={dataRoom.classroom_name}
                  className={clsx(
                    !isUpdate ? 'text-[#9CA3AF]' : '',
                    errors['classroomName'] && isValidate && isUpdate
                      ? 'border border-red-500'
                      : '',
                    'shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  )}
                  disabled={!isUpdate}
                  onChange={(e) => {
                    field.onChange(e)
                    setDataRoom({ ...dataRoom, classroom_name: e.target.value })
                  }}
                  errors={errors}
                  register={register}
                />
                {errors['classroomName'] && isValidate && isUpdate && (
                  <label className="text-[#fe0001]">{errors['classroomName'].message}</label>
                )}
              </>
            )}
          />
        </div>
        <div className="mb-10">
          <label className="block font-bold mb-2" htmlFor="note">
            Ghi Chú
          </label>
          <Controller
            name="note"
            control={control}
            defaultValue={dataRoom.note ? dataRoom.note : ''}
            render={({ field }) => (
              <textarea
                {...field}
                className={clsx(
                  !isUpdate ? 'text-[#9CA3AF]' : '',
                  'shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                )}
                id="note"
                rows={4}
                type="text"
                value={dataRoom.note ? dataRoom.note : ''}
                onChange={(e) => setDataRoom({ ...dataRoom, note: e.target.value })}
                disabled={!isUpdate}
              />
            )}
          />
        </div>
        {!isUpdate ? (
          <>
            <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
              <Button
                name="delete-room"
                type="button"
                className="border-red-600 bg-red-600"
                onClick={() => handleModal('delete-room')}
                text="Xóa phòng"
                Svg={SvgMinus}
              />
              <Button
                name="update-room"
                className="border-emerald-600 bg-emerald-600"
                onClick={() => {
                  setIsUpdate(true)
                  setIsValidate(false)
                }}
                text="Sửa phòng"
                Svg={SvgPencilUpdate}
              />
            </div>
          </>
        ) : (
          <div className="pl-4 py-3 sm:flex sm:flex-row sm:pl-6 justify-end gap-3">
            <Button
              name="delete-room"
              className="rounded-md bg-gray-600"
              onClick={() => {
                setIsUpdate(false)
                setDataRoom(dataRoominit)
                setIsValidate(false)
              }}
              text="Hủy"
            />
            <Button
              type="submit"
              name="update-room"
              className="rounded-md bg-emerald-600"
              text="Lưu"
              onClick={() => setIsValidate(true)}
            />
          </div>
        )}
      </form>
    </>
  )
}

export default InforRoom
