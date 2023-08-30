import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { addClassroom } from "../../../../services/apiService";


export default function ModalAddRoom(props) {
    const { setOpen } = props;

    const [id, setId] = useState("");
    const [roomName, setRoomName] = useState("");
    const [note, setNote] = useState("");

    const cancelButtonRef = useRef(null);

    console.log('roomName', roomName);
    
    const handleAddRoom = async () => {
        await addClassroom(roomName);
        toast.success("Thêm phòng thành công");
        setOpen(false);
    };
    return (
        <>
            <h1 className="text-xl font-bold mb-2">Thêm phòng mới</h1>
            <form className="text-gray-900 text-lg font-medium bg-white shadow-md rounded p-8">
                {/* <div className="mb-8">
          <label className="block mb-2" htmlFor="id">
            Mã Phòng
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            type="text"
            onChange={(e) => setId(e.target.value)}
          />
        </div> */}
                <div className="mb-8">
                    <label className="block mb-2" htmlFor="roomname">
                        Tên Phòng
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="roomname"
                        type="text"
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </div>
                {/* <div className="mb-8">
          <label className="block mb-2" htmlFor="id">
            Tầng
          </label>
          <input
            className="shadow appearance-none border font-bold rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            type="text"
            placeholder="1"
            disabled
          />
        </div> */}
                {/* <div className="">
          <label className="block mb-2" htmlFor="note">
            Ghi Chú (bắt buộc nhập trước khi thay đổi)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="note"
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div> */}
            </form>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto"
                    onClick={() => handleAddRoom()}
                >
                    Lưu
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                >
                    Hủy
                </button>
            </div>
        </>
    );
}
