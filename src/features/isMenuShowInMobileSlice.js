import { createSlice } from "@reduxjs/toolkit";

const isMenuShowInMobileSlice = createSlice({
    name: "isMenuShowInMobile",
    initialState: {
        value: false
    },

    reducers: {
        setIsMenuShowInMobile: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsMenuShowInMobile } = isMenuShowInMobileSlice.actions;
export default isMenuShowInMobileSlice.reducer;