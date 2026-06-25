import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ifadet-sakan`;

//----------------------------------------------------
//  A D D    N E W   IFADET SAKAN
//----------------------------------------------------
export const registerifadetSakan = async (Data) => {
  try {
    console.log("SErvices:", Data)
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
      toast.success("ifadetSakan Created Successfully");
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
//    G E T  A L L   IFADET SAKAN
//----------------------------------------------------
const getAllifadetSakan = async (page = 1, limit = 8, search = "") => {
  // Construct the filter object (matching your backend's JSON.parse(req.query.filter) logic)
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
//    G E T  S I N G L E   IFADET SAKAN
//----------------------------------------------------
export const getifadetSakan = async (id) => {
  const reponse = await axios.get(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    IFADET SAKAN
//----------------------------------------------------
const deleteifadetSakan = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/" + id);
    return response.data;
  } catch (error) {
    throw error.response?.data.error; // so you can use it in UI
  }
};

//----------------------------------------------------
//    U P D A T E   IFADET SAKAN
//----------------------------------------------------

export const updateifadetSakan = async (id, Data) => {
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
      toast.success("ifadetSakan Updated Successfully");
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

const ifadetSakanService = {
  registerifadetSakan,
  getAllifadetSakan,
  getifadetSakan,
  deleteifadetSakan,
  updateifadetSakan,
};

export default ifadetSakanService;
