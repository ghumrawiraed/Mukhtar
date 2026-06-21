import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
