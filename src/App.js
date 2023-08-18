import "./App.css";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="app-contents">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
