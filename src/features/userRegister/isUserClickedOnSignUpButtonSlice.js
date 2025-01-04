import { createSlice } from "@reduxjs/toolkit";

const isUserClickedOnSignUpButtonSlice = createSlice({
    name: "isUserClickedOnSignUpButton",
    initialState: {
        value: false
    },

    reducers: {
        setIsUserClickedOnSignUpButton: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsUserClickedOnSignUpButton } = isUserClickedOnSignUpButtonSlice.actions;
export default isUserClickedOnSignUpButtonSlice.reducer;