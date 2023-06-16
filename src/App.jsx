import { useState } from "react";
import "./App.css";
import Navbar from "./Pages/Home/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Pages/Home/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>

      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
