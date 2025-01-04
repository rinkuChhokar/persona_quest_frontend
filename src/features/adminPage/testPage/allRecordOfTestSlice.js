import { createSlice } from "@reduxjs/toolkit";

const allRecordOfTestSlice = createSlice({
    name: "allRecordOfTest",
    initialState: {
        value: []
    },

    reducers: {
        setAllRecordOfTest: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setAllRecordOfTest } = allRecordOfTestSlice.actions;
export default allRecordOfTestSlice.reducer;