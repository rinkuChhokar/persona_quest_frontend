import { createSlice } from "@reduxjs/toolkit";

const isMainLoaderActiveSlice = createSlice({
    name: "isMainLoaderActive",
    initialState: {
        value: false
    },

    reducers: {
        setIsMainLoaderActive: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsMainLoaderActive } = isMainLoaderActiveSlice.actions;
export default isMainLoaderActiveSlice.reducer;