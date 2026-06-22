import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredUsers: [],
};

const userFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_USERS(state, action) {
     
      const { users, search } = action.payload;
      const tempUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );

      

      state.filteredUsers = tempUsers;
    },
  },
});

export const { FILTER_USERS } = userFilterSlice.actions;

export const selectFilteredUsers = (state) =>
  state.userFilter.filteredUsers;

export default userFilterSlice.reducer;
