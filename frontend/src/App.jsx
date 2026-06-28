import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Login from "./pages/login";
import RegisterUser from "./pages/registerUser";
import IfadetSakanList from "./pages/IfadetSakan/ifadetSakanList";
import ResidentList from "./pages/residents/residentList";
import AddResident from "./pages/residents/addResident";
import EditResident from "./pages/residents/editResident";
import DummyPaginatedTable from "./pages/tesr";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/ifadet-sakan/list" element={<IfadetSakanList />} />
          <Route path="/resident/list" element={<ResidentList />} />
          <Route path="/resident/new" element={<AddResident />} />
          <Route path="/resident/:id" element={<EditResident />} />
          <Route path="/test" element={<DummyPaginatedTable />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
