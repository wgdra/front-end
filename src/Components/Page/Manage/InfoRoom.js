import clsx from 'clsx'

const InforRoom = ({ dataRoom, isUpdate, setDataRoom }) => {
  console.log('dataRoom', dataRoom)
  return (
    <>
      <form className="text-gray-900 text-lg bg-white shadow-md rounded p-8">
        <div className="mb-10">
          <label className="block font-bold mb-2" htmlFor="id">
            Mã Phòng
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            type="text"
            placeholder={dataRoom.id}
            disabled
          />
        </div>
        <div className="mb-10">
          <label className="block font-bold mb-2" htmlFor="roomname">
            Tên Phòng
          </label>
          <input
            className={clsx(
              !isUpdate ? 'text-[#9CA3AF]' : '',
              'shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            )}
            id="roomname"
            type="text"
            value={dataRoom.classroom_name}
            onChange={(e) => setDataRoom({ ...dataRoom, classroom_name: e.target.value })}
            disabled={!isUpdate}
          />
        </div>
        <div className="">
          <label className="block font-bold mb-2" htmlFor="note">
            Ghi Chú
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="note"
            rows={4}
            type="text"
            placeholder={dataRoom.note}
            onChange={(e) => setDataRoom({ ...dataRoom, note: e.target.value })}
            disabled={!isUpdate}
          />
        </div>
      </form>
    </>
  )
}

export default InforRoom
