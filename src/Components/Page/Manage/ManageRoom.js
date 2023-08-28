import { useEffect, useState } from "react";
import Modal from "./Modals/Modal";
import { getDataRoom } from "../../../services/apiService";
import InforRoom from "./InfoRoom";

export default function ManageRoom() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [btnName, setBtnName] = useState("");

  const [listRoom, setListRoom] = useState("");
  const [dataRoom, setDataRoom] = useState("");

  console.log();
  //Handle
  const handleShowHide = () => {
    setShow((show) => !show);
  };

  const handleModal = (name) => {
    setOpen(true);
    setBtnName(name);
  };

  //Api
  useEffect(() => {
    fetchListRoom();
  }, []);

  const fetchListRoom = async () => {
    let res = await getDataRoom();
    setListRoom(res);
  };

  const showListRoom = () => {
    return (
      <>
        {listRoom && listRoom.length > 0 ? (
          listRoom.map((item, index) => {
            return (
              <>
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() => handleShowHide()}
                  key={index}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Tầng {item.id}
                </span>
                {show === true
                  ? item.room.map((data, index) => {
                      console.log(data);
                      return (
                        <ul key={index} className="ml-10">
                          <li
                            className="cursor-pointer"
                            onClick={() => setDataRoom(data)}
                          >
                            {data.name}
                          </li>
                        </ul>
                      );
                    })
                  : ""}
              </>
            );
          })
        ) : (
          <span>Not data</span>
        )}
      </>
    );
  };

  return (
    <div className="flex h-full ">
      <div className="w-1/3 mr-10 border bg-white border-primary">
        <div className="flex items-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
            />
          </svg>

          <span className="font-semibold">DANH SÁCH</span>
        </div>
        <div className="p-5 font-bold">
          <button
            name="add-room"
            className="flex items-center text-white border border-emerald-600 bg-emerald-600 rounded-lg px-3 py-2 mb-5"
            onClick={(e) => handleModal(e.target.name)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            Thêm phòng
          </button>

          <div className="text-gray-900">
            <h1 className="border-b-2 border-primary mb-2">Tòa Nhà H</h1>
            <div className="mb-5">{showListRoom()}</div>
          </div>
        </div>
      </div>

      <div className="w-2/3 border bg-white border-primary">
        <div className="flex items-center h-12 px-5 text-gray-200 text-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>

          <span className="font-semibold">PHÒNG 101</span>
        </div>

        <div className="p-5 font-bold">
          <div className="flex justify-between">
            <h1 className="text-xl text-gray-900">Thông Tin Chung</h1>
            <button
              name="delete-room"
              className="flex items-center text-white border border-red-600 bg-red-600 rounded-lg px-3 py-2 mb-5"
              onClick={(e) => handleModal(e.target.name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Xóa phòng
            </button>
          </div>

          <div className="mt-10">
            <InforRoom dataRoom={dataRoom} />
            <div className="flex justify-end">
              <button
                name="update-room"
                className="flex items-center text-white border border-yellow-600 bg-yellow-600 rounded-lg px-3 py-2 mb-5"
                onClick={(e) => handleModal(e.target.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
                Chỉnh sửa
              </button>
              {/* <button
                className="flex justify-center w-20 text-white border border-gray-600 bg-gray-600 rounded-lg px-3 py-2 mb-5 mx-5"
                onClick={() => handleCancel()}
              >
                Hủy
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} name={btnName} />
    </div>
  );
}
