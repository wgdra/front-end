import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { postDataUser } from "../../../../services/apiService";

export default function ModalAddUser(props) {
  const { setOpen, fetchDataUser } = props;
  const cancelButtonRef = useRef(null);

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddUser = async () => {
    await postDataUser(userId, fullName, subject, role, email, phoneNumber);
    toast.success("Thêm mới thành công");
    setOpen(false);
    fetchDataUser();
  };
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Thêm Giảng Viên</h1>
      <form className="text-gray-900 text-lg font-medium bg-white shadow-md rounded p-8">
        <div className="mb-5">
          <label className="block mb-2" htmlFor="id">
            Mã Giảng Viên
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            type="text"
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2" htmlFor="roomname">
            Tên Giảng Viên
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="roomname"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2" htmlFor="roomname">
            Bộ Môn
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="roomname"
            type="text"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2" htmlFor="roomname">
            Chức Vụ
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="roomname"
            type="text"
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2" htmlFor="roomname">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="roomname"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2" htmlFor="roomname">
            Số Điện Thoại
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="roomname"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </form>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto"
          onClick={() => handleAddUser()}
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
