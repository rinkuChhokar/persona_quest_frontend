import { createSlice } from "@reduxjs/toolkit";

const isUserClickedOnSignInButtonForAdminSlice = createSlice({
    name: "isUserClickedOnSignInButtonForAdmin",
    initialState: {
        value: false
    },

    reducers: {
        setIsUserClickedOnSignInButtonForAdmin: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsUserClickedOnSignInButtonForAdmin } = isUserClickedOnSignInButtonForAdminSlice.actions;
export default isUserClickedOnSignInButtonForAdminSlice.reducer;