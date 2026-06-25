import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Login from "./pages/login";
import RegisterUser from "./pages/registerUser";
import IfadetSakanList from "./pages/IfadetSakan/ifadetSakanList";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >         
          <Route path="/login" element={<Login/>} />                           
          <Route path="/register" element={<RegisterUser />} />         
          <Route path="/ifadet-sakan" element={<IfadetSakanList />} />  

      </Route>   
      </Routes> 
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
