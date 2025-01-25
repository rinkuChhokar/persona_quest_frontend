import { createSlice } from "@reduxjs/toolkit";

const allPersonalityTestsSlice = createSlice({
    name: "allPersonalityTests",
    initialState: {
        value: []
    },

    reducers: {
        setAllPersonalityTests: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setAllPersonalityTests } = allPersonalityTestsSlice.actions;
export default allPersonalityTestsSlice.reducer;