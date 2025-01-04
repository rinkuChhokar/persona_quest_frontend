import { createSlice } from "@reduxjs/toolkit";

const isUserLoggedInSlice = createSlice({
    name: "isUserLoggedIn",
    initialState: {
        value: false
    },

    reducers: {
        setIsUserLoggedIn: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsUserLoggedIn } = isUserLoggedInSlice.actions;
export default isUserLoggedInSlice.reducer;