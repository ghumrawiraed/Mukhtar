import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getLoginStatus,
  getUsers,
  GetUser,
  UpdateUser,
  DeleteUser,
} from "../../services/authService";

const username = JSON.parse(localStorage.getItem("username"));
const initialState = {
  isLoggedIn: false,
  username: username ? username : "",
  user: {
    username: "",
  },
  users: [],
  userID: "",
};

// GET ALL USERS
export const fetchUsers = createAsyncThunk(
  "auth/getAll",
  async (_, thunkAPI) => {
    try {
      return await getUsers();
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

// CHECK LOGIN STATUS
export const checkLoginStatus = createAsyncThunk(
  "auth/checkLoginStatus",
  async (_, thunkAPI) => {
    try {
      const status = await getLoginStatus();
      return status;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// get a single USER
export const getUser = createAsyncThunk(
  "Users/getUser",
  async (id, thunkAPI) => {
    try {
      return await GetUser(id);
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

// UPDATE A USER

export const updateUser = createAsyncThunk(
  "Users/updateUser",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await UpdateUser(id, formData);
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

// DELETE A USER

export const deleteUser = createAsyncThunk(
  "Users/delete",
  async (id, thunkAPI) => {
    try {
      return await DeleteUser(id);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_USERNAME(state, action) {
      localStorage.setItem("username", JSON.stringify(action.payload));
      state.username = action.payload;
    },

    SET_ID(state, action) {
      state.userID = action.payload;
    },

    SAVE_USER(state, action) {
      const profile = action.payload;
      state.user.username = profile.user.name;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      })
      // fetchUsers in progress case
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      // fetchUsers sucessfull  case
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.users = action.payload;
      })
      //  error getting users case
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getuser  in progress case
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      // getuser sucessfull  case
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      //  error getting user case
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update user  in progress case
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      // update user sucessfull  case
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.user = action.payload;
      })
      //  error updating user case
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete user  in progress case
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      // delete users sucessfull  case
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id,
        );
        toast.success("User Deleted Sucessfully");
      })
      //  error deleting user case
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { SET_LOGIN, SET_USERNAME, SET_ID } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUsername = (state) => state.auth.username;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;
