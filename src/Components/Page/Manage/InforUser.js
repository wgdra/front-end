const InforUser = (props) => {
  const { inforUser } = props
  return (
    <form className="text-gray-900 text-lg bg-white shadow-md rounded px-8 py-16 mb-20">
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold" htmlFor="id">
          Mã Giảng Viên
        </label>
        <input
          className="shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight"
          id="id"
          placeholder={inforUser.id}
          disabled
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Tên Giảng Viên</label>
        <input
          className="shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight"
          placeholder={inforUser.full_name}
          disabled
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Bộ Môn</label>
        <input
          className="shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight"
          placeholder={inforUser.subject}
          disabled
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Chức vụ</label>
        <input
          className="shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight"
          placeholder={inforUser.role}
          disabled
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Email</label>
        <input
          className="shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight"
          placeholder={inforUser.email}
          disabled
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label className="font-bold">Số Điện Thoại</label>
        <input
          className="shadow appearance-none border rounded w-4/5 py-2 px-3 leading-tight"
          placeholder={inforUser.phonenumber}
          disabled
        />
      </div>
    </form>
  )
}

export default InforUser
