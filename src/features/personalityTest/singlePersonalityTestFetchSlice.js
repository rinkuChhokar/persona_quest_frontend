import { createSlice } from "@reduxjs/toolkit";

const singlePersonalityTestFetchSlice = createSlice({
    name: "singlePersonalityTestFetch",
    initialState: {
        value: null
    },

    reducers: {
        setSinglePersonalityTestFetch: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setSinglePersonalityTestFetch } = singlePersonalityTestFetchSlice.actions;
export default singlePersonalityTestFetchSlice.reducer;