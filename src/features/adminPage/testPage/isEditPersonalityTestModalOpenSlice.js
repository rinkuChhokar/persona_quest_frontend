import { createSlice } from "@reduxjs/toolkit";

const isEditPersonalityTestModalOpenSlice = createSlice({
    name: "isEditPersonalityTestModalOpen",
    initialState: {
        value: false
    },

    reducers: {
        setIsEditPersonalityTestModalOpen: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setIsEditPersonalityTestModalOpen } = isEditPersonalityTestModalOpenSlice.actions;
export default isEditPersonalityTestModalOpenSlice.reducer;