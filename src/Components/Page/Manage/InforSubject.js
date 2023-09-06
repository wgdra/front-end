import clsx from 'clsx'

const InforSubject = (props) => {
  const { dataSubject, setDataSubject, isUpdate } = props
  return (
    <form className="text-gray-900 text-lg bg-white shadow-md rounded px-8 py-16 mb-20">
      <div className="mb-20 flex items-center justify-between">
        <label className="font-bold">Mã Môn Học</label>
        <input
          className="shadow text-[#9CA3AF] appearance-none border rounded w-4/5 py-2 px-3 leading-tight"
          id="id"
          value={dataSubject.id}
          disabled
        />
      </div>
      <div className="mb-20 flex items-center justify-between">
        <label className="font-bold">Tên Môn Học</label>
        <input
          className={clsx(
            !isUpdate ? 'text-[#9CA3AF]' : '',
            'shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          )}
          value={dataSubject.subject_name}
          onChange={(e) => setDataSubject({ ...dataSubject, subject_name: e.target.value })}
          disabled={!isUpdate}
        />
      </div>
    </form>
  )
}

export default InforSubject
