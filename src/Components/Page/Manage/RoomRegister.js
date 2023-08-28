export default function RoomRegister() {
  return (
    <>
      <header className="w-full py-2">
        <div className="flex items-center justify-end h-14 -mx-10">
          <div className="inline-block relative w-28 mr-4 ">
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option>Tháng 8</option>
              <option>Tháng 9</option>
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
          <div className="inline-block relative w-1/5">
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option>Tuần 1 (Thứ 3, ngày 01 - Chủ nhật, ngày 06)</option>
              <option>Tuần 2 (Thứ 2, ngày 07 - Chủ nhật, ngày 13)</option>
              <option>Tuần 3 (Thứ 2, ngày 14 - Chủ nhật, ngày 20)</option>
              <option>Tuần 4 (Thứ 2, ngày 21 - Chủ nhật, ngày 27)</option>
              <option>Tuần 5 (Thứ 2, ngày 28 - Thứ 5, ngày 31)</option>
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
      <div></div>
    </>
  );
}
