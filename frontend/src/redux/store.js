import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import residentReducer from "../redux/resident/residentSlice";
import residentFilterReducer from "../redux/resident/residentFilterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,    
    resident: residentReducer,
    residentFilter: residentFilterReducer,
  },
});
