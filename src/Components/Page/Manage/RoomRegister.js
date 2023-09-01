import { useState } from "react";
import Calendar from "./Calendar";

export default function RoomRegister() {
  const [isOption, setIsOption] = useState("Aug");

  const handleChangeOption = (value) => {
    setIsOption(value);
  };
  return (
    <>
      <header className="w-full">
        <div className="flex items-center justify-between h-14 -mt-5 mb-5 px-10">
          <div className="flex items-center w-2/3 text-base">
            <span className="font-bold text-red-600">GHI CHÚ:</span>
            <div className="flex font-semibold ml-10">
              Phòng trống
              <span className="block bg-white w-20 border-solid border border-gray-400 ml-5"></span>
            </div>
            <div className="flex font-semibold ml-10">
              Phòng đã đăng ký
              <span className="block bg-green-500 w-20 border-solid border border-green-500 ml-5"></span>
            </div>
            <div className="flex font-semibold ml-10">
              Phòng đang bảo trì
              <span className="block bg-yellow-500 w-20 border-solid border border-yellow-500 ml-5"></span>
            </div>
          </div>
          <div className="inline-block relative w-28">
            <select
              className="block font-bold appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => handleChangeOption(e.target.value)}
            >
              <option value="Aug">Tháng 8</option>
              <option value="Sep">Tháng 9</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
      <div class="w-full border-solid border-2 border-primary">
        <Calendar isOption={isOption} />
      </div>
    </>
  );
}
