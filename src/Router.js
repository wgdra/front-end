import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Error from "./Components/Page/Error";
import Home from "./Components/Page/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ManageRoom from "./Components/Page/ManageRoom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="manage-room" element={<ManageRoom />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
