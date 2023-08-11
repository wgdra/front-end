import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="z-10 text-gray-200 dark:bg-gray-900">
      <nav
        className="mx-7 text-lg flex items-center max-w-full p-6 lg:px-8"
        aria-label="Global"
      >
        <NavLink className="w-1/5 text-center font-semibold" to="/">
          MANAGEROOM
        </NavLink>
        <div className="w-3/5">
          <NavLink to="/manage-room" className="mr-10 font-semibold leading-6">
            Trang Chủ
          </NavLink>
          <NavLink to="/" className="mr-10 font-semibold leading-6">
            Giới Thiệu
          </NavLink>
          <NavLink className="font-semibold leading-6">Liên Hệ</NavLink>
        </div>
        <div className="w-1/5 text-center">
          <button
            className="btn text-base mx-3.5"
            onClick={() => navigate("/register")}
          >
            Đăng Ký
          </button>
          <button
            className="btn text-base mx-3.5"
            onClick={() => navigate("/login")}
          >
            Đăng Nhập
          </button>
        </div>
      </nav>
    </header>
  );
}
