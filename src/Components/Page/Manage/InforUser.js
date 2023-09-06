import clsx from 'clsx'

const InforUser = (props) => {
  const { inforUser, setInforUser, isUpdate } = props
  console.log(inforUser)
  return (
    <form className="text-gray-900 text-lg bg-white shadow-md rounded px-8 py-16 mb-20">
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Mã Giảng Viên</label>
        <input
          className="shadow text-[#9CA3AF] appearance-none border rounded w-4/5 py-2 px-3 leading-tight"
          id="id"
          value={inforUser.id}
          disabled
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Tên Giảng Viên</label>
        <input
          className={clsx(
            !isUpdate ? 'text-[#9CA3AF]' : '',
            'shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          )}
          value={inforUser.full_name}
          onChange={(e) => setInforUser({ ...inforUser, full_name: e.target.value })}
          disabled={!isUpdate}
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Bộ Môn</label>
        <input
          className={clsx(
            !isUpdate ? 'text-[#9CA3AF]' : '',
            'shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          )}
          value={inforUser.subject}
          onChange={(e) => setInforUser({ ...inforUser, subject: e.target.value })}
          disabled={!isUpdate}
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Chức vụ</label>
        <select
          className={clsx(
            !isUpdate ? 'text-[#9CA3AF]' : '',
            'shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          )}
          onChange={(e) => setInforUser({ ...inforUser, role: e.target.value })}
          disabled={!isUpdate}
        >
          <option value={inforUser.role}>Admin</option>
          <option value={inforUser.role}>User</option>
        </select>
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Email</label>
        <input
          className={clsx(
            !isUpdate ? 'text-[#9CA3AF]' : '',
            'shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          )}
          type="email"
          value={inforUser.email}
          onChange={(e) => setInforUser({ ...inforUser, email: e.target.value })}
          disabled={!isUpdate}
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Số Điện Thoại</label>
        <input
          className={clsx(
            !isUpdate ? 'text-[#9CA3AF]' : '',
            'shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          )}
          type="number"
          value={inforUser.phone}
          onChange={(e) => setInforUser({ ...inforUser, phone: e.target.value })}
          disabled={!isUpdate}
        />
      </div>
    </form>
  )
}

export default InforUser
