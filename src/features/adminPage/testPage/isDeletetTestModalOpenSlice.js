import { createSlice } from "@reduxjs/toolkit";

const isDeletetTestModalOpenSlice = createSlice({
    name: "isDeletetTestModalOpen",
    initialState: {
        value: false
    },

    reducers: {
        setIsDeletetTestModalOpen: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsDeletetTestModalOpen } = isDeletetTestModalOpenSlice.actions;
export default isDeletetTestModalOpenSlice.reducer;