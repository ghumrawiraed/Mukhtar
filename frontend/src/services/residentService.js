import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/resident`;

//----------------------------------------------------
//  A D D    N E W   R E S I D E N T
//----------------------------------------------------
export const registerResident = async (Data) => {
  try {
    console.log("SErvices:", Data);
    const response = await axios.post(
      `${API_URL}/new`,

      Data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      toast.success("Resident Created Successfully");
    }

    return response.data;
  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("RESPONSE DATA:", error.response?.data);
    const message =
      error.response?.data?.message || error.message || error.toString();

    toast.error(message);
  }
};
//----------------------------------------------------
//    G E T  A L L   R E S I D E N T
//----------------------------------------------------
const getAllResident = async ({ page = 1, limit = 15, search = "" }) => {
  const response = await axios.get(API_URL, {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};
//----------------------------------------------------
//    G E T  S I N G L E   R E S I D E N T
//----------------------------------------------------
export const getResident = async (id) => {
  console.log("getResident service running");
  try {
    const response = await axios.get(API_URL + "/" + id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data.error; // so you can use it in UI
  }
};

//----------------------------------------------------
//    D E L E T E    R E S I D E N T
//----------------------------------------------------
const deleteResident = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/" + id);
    return response.data;
  } catch (error) {
    throw error.response?.data.error; // so you can use it in UI
  }
};

//----------------------------------------------------
//    U P D A T E   R E S I D E N T
//----------------------------------------------------

export const updateResident = async (id, Data) => {
  try {
    console.log("UPDATE SERVICE RUNNING");
    console.log("certData:", Data);

    const response = await axios.patch(`${API_URL}/${id}`, Data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.statusText === "OK") {
      toast.success("Resident Updated Successfully");
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

const ResidentService = {
  registerResident,
  getAllResident,
  getResident,
  deleteResident,
  updateResident,
};

export default ResidentService;
