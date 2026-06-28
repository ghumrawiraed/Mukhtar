import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import residentService from "../../services/residentService";
import { toast } from "react-toastify";
const initialState = {
  resident: null,
  residents: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: "",
};

// GET ALL EMPLOYEES
export const fetchResidents = createAsyncThunk(
  "residents/getAll",
  async ({ page, limit, search }, thunkAPI) => {
    try {
      console.log("Starting API call  slice");
      return await residentService.getAllResident({ page, limit, search });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// DELETE A EMPLOYEE

export const deleteResident = createAsyncThunk(
  "residents/delete",
  async (id, thunkAPI) => {
    try {
      console.log("deleteResident Slice :", id);
      return await residentService.deleteResident(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// get a single resident
export const getResident = createAsyncThunk(
  "residents/getResident",
  async (id, thunkAPI) => {
    try {
      return await residentService.getResident(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// UPDATE A EMPLOYEE

export const updateResident = createAsyncThunk(
  "residents/updateResident",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log("UPDATE EMPLOYEE IN SLICE");
      console.log(formData);

      return await residentService.updateResident(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const residentSlice = createSlice({
  name: "resident",
  initialState,
  reducers: {
    SAVE_RESIDENT(state, action) {
      const profile = action.payload;
      state.resident.title = profile.title;
    },
  },

  // extraReducers will store responses that comes from createAsyncThunk
  extraReducers: (builder) => {
    builder

      // getresidents  in progress case
      .addCase(fetchResidents.pending, (state) => {
        state.isLoading = true;
      })
      // get residents sucessfull  case
      .addCase(fetchResidents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log("fetchdata fulfilled:", action.payload);
        state.residents = action.payload;
      })
      //  error getting residents case
      .addCase(fetchResidents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // gettrip  in progress case
      .addCase(getResident.pending, (state) => {
        state.isLoading = true;
      })
      // get resident sucessfull  case
      .addCase(getResident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.resident = action.payload;
      })
      //  error getting resident case
      .addCase(getResident.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update resident  in progress case
      .addCase(updateResident.pending, (state) => {
        state.isLoading = true;
      })
      // update resident sucessfull  case
      .addCase(updateResident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.resident = action.payload;
      })
      //  error updating resident case
      .addCase(updateResident.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete resident  in progress case
      .addCase(deleteResident.pending, (state) => {
        state.isLoading = true;
      })
      // delete residents sucessfull  case
      .addCase(deleteResident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.residents = state.residents.data.filter(
          (resident) => resident.id !== action.payload.id,
        );
        toast.success("Resident Deleted Sucessfully");
      })
      //  error deleting resident case
      .addCase(deleteResident.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.resident.isLoading;
export const selectResident = (state) => state.resident.resident;

export const { SAVE_RESIDENT } = residentSlice.actions;

export default residentSlice.reducer;
