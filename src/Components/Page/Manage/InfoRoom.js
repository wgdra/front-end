const InforRoom = (props) => {
  const { dataRoom } = props;

  return (
    <>
      <form className="text-gray-900 text-lg bg-white shadow-md rounded px-8 py-16 mb-20">
        <div className="mb-10">
          <label className="block font-bold mb-2" htmlFor="id">
            Mã Phòng
          </label>
          <input
            className="shadow appearance-none border rounded w-2/3 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            type="text"
            placeholder={dataRoom.room_id}
            disabled
          />
        </div>
        <div className="mb-10">
          <label className="block font-bold mb-2" htmlFor="roomname">
            Tên Phòng
          </label>
          <input
            className="shadow appearance-none border rounded w-2/3 py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="roomname"
            type="text"
            placeholder={dataRoom.name}
            disabled
          />
        </div>
        <div className="">
          <label className="block font-bold mb-2" htmlFor="note">
            Ghi Chú (bắt buộc nhập trước khi thay đổi)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="note"
            type="text"
            placeholder={dataRoom.note}
            disabled
          />
        </div>
      </form>
    </>
  );
};

export default InforRoom;
