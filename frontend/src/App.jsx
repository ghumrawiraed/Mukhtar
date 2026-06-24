import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Sample from "./pages/sample";
import Login from "./pages/login";
import RegisterUser from "./pages/registerUser";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >         
          <Route path="/login" element={<Login/>} />                   
          <Route path="/sample" element={<Sample/>} />
          <Route path="/register" element={<RegisterUser />} />         

      </Route>   
      </Routes> 
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
