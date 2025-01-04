import { createSlice } from "@reduxjs/toolkit";

const isUserClickedOnSignInButtonSlice = createSlice({
    name: "isUserClickedOnSignInButton",
    initialState: {
        value: false
    },

    reducers: {
        setIsUserClickedOnSignInButton: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsUserClickedOnSignInButton } = isUserClickedOnSignInButtonSlice.actions;
export default isUserClickedOnSignInButtonSlice.reducer;