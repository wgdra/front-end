import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SvgMinus, SvgPencilUpdate } from '../../ui/Svg'
import InputWithValidation from '../../ui/InputWithValidation'
import { putDataRoom } from '../../../services/apiService'
import { toast } from 'react-toastify'
import { Button } from '../../ui/Button'

const InforRoom = ({
  dataRoom,
  isUpdate,
  setDataRoom,
  handleModal,
  setIsUpdate,
  dataRoominit,
  fetchListRoom,
}) => {
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

  const handleUpdateRoom = async (data) => {
    console.log('Dât', data)
    if (data) {
      await putDataRoom(dataRoom.id, dataRoom.classroom_name, dataRoom.note)
      toast.success('Cập nhật thành công')
      setIsUpdate(false)
      fetchListRoom()
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
                    errors['classroomName'] ? 'border border-red-500' : '',
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
                {errors['classroomName'] && (
                  <label className="text-[#fe0001]">{errors['classroomName'].message}</label>
                )}
              </>
            )}
          />
          {/* <input
            className={clsx(
              !isUpdate ? 'text-[#9CA3AF]' : '',
              'shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            )}
            id="roomname"
            type="text"
            value={dataRoom.classroom_name}
            onChange={(e) => setDataRoom({ ...dataRoom, classroom_name: e.target.value })}
            disabled={!isUpdate}
          /> */}
        </div>
        <div className="">
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
                name="update-room"
                className="border-yellow-600 bg-yellow-600"
                onClick={() => setIsUpdate(true)}
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
              }}
              text="Hủy"
            />
            <Button
              type="submit"
              name="update-room"
              className="rounded-md bg-emerald-600"
              text="Lưu"
            />
          </div>
        )}
      </form>
      <Button
        name="delete-room"
        className="w-[130px] border-red-600 bg-red-600 mt-5"
        onClick={() => handleModal('delete-room')}
        text="Xóa phòng"
        Svg={SvgMinus}
      />
    </>
  )
}

export default InforRoom
