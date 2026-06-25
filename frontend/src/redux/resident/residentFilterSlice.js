import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredResidents: [],
};

const residentFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_RESIDENTS(state, action) {
      console.log("FROM FILTER SLICE:",action.payload)
      const { residents, search } = action.payload;
      const tempResidents = residents.data.filter((emp) =>        
       emp.first_name?.toLowerCase().includes(search.toLowerCase()) ||
       emp.family_name?.toLowerCase().includes(search.toLowerCase()) ||
       emp.father_name?.toString().includes(search)
      );
     
           
      state.filteredResidents = tempResidents;
    },
  },
});

export const { FILTER_RESIDENTS } = residentFilterSlice.actions;

export const selectFilteredResidents = (state) => state.residentFilter.filteredResidents;

export default residentFilterSlice.reducer;
