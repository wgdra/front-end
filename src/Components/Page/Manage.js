import { Outlet } from "react-router-dom";
import NavManage from "../Nav/NavManage";

export default function Manage() {
  return (
    <>
      <NavManage />
      <div className="content-container max-w-full h-[calc(100vh-76px)] py-10 px-20 bg-gray-200">
        <Outlet />
      </div>
    </>
  );
}
