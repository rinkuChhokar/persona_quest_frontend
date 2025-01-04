import { createSlice } from "@reduxjs/toolkit";

const isAdminLoggedInSlice = createSlice({
    name: "isAdminLoggedIn",
    initialState: {
        value: false
    },

    reducers: {
        setIsAdminLoggedIn: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsAdminLoggedIn } = isAdminLoggedInSlice.actions;
export default isAdminLoggedInSlice.reducer;