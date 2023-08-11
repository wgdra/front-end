import "./App.css";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Header />

      <div className="app-contents">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
