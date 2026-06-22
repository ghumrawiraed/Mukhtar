import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users`;

export const validateEmail = (email) => {
  return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

//----------------------------------------------------
//  R E G I S T E R   N E W   U S E R
//----------------------------------------------------
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("User Registered sucessfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//----------------------------------------------------
//  L O G I N   U S E R
//----------------------------------------------------

export const loginUser = async (userData) => {
  try {
    console.log(  `${BACKEND_URL}/api/users/login`);
     console.log(userData);
    const response = await axios.post(
      `${API_URL}/login`,
      userData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      // toast.success("Login sucessfull")
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//----------------------------------------------------
//  L O G O U T   U S E R
//----------------------------------------------------

export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//----------------------------------------------------
//GET LOGIN STATUS
//----------------------------------------------------

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`, {
      withCredentials: true, // 👈 important for cookies
    });
    console.log(response.data);
    return response.data; // should be true or false
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
    return false;
  }
};

//----------------------------------------------------
//    G E T  A L L   U S E R S
//----------------------------------------------------
export const getUsers = async (page = 1, limit = 8, search = "") => {
 const filter = search
    ? JSON.stringify({ status: { $like: `%${search}%` } })
    : "{}";

  const response = await axios.get(API_URL, {
    params: {
      page,
      limit,
      filter, // Send as a string for JSON.parse on backend
      sort: JSON.stringify([["ID", "DESC"]]),
    },
  });
  return response;
};

//----------------------------------------------------
//    G E T  S I N G L E   U S E R
//----------------------------------------------------
export const GetUser = async (id) => {
  const reponse = await axios.get(`${BACKEND_URL}/api/users/${id}`);
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    U S E R
//----------------------------------------------------
export const DeleteUser = async (id) => {
  const reponse = await axios.delete(`${BACKEND_URL}/api/users/${id}`);
  return reponse.data;
};

//----------------------------------------------------
//    U P D A T E   U S E R
//----------------------------------------------------

export const UpdateUser = async (id, userData) => {
  try {
    const formData = new FormData();
    formData.append("name", userData.title);
    formData.append("email", userData.destination);
    formData.append("type", userData.demographic);

    const response = await axios.put(
      `${BACKEND_URL}/api/users/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.statusText === "OK") {
      toast.success("User Updated Successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//----------------------------------------------------
//    C H A N G E  P A S S W O R D
//----------------------------------------------------
export const ChangePassword = async (userData) => {
  console.log(userData);
  const reponse = await axios.patch(
    `${BACKEND_URL}/api/users/changepass`,
    userData,
    {
      withCredentials: true,
    }
  );
  return reponse.data;
};

