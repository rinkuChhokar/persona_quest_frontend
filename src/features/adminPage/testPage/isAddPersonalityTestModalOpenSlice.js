import { createSlice } from "@reduxjs/toolkit";

const isAddPersonalityTestModalOpenSlice = createSlice({
    name: "isAddPersonalityTestModalOpen",
    initialState: {
        value: false
    },

    reducers: {
        setIsAddPersonalityTestModalOpen: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsAddPersonalityTestModalOpen } = isAddPersonalityTestModalOpenSlice.actions;
export default isAddPersonalityTestModalOpenSlice.reducer;