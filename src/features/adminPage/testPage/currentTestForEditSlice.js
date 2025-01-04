import { createSlice } from "@reduxjs/toolkit";

const currentTestForEditSlice = createSlice({
    name: "currentTestForEdit",
    initialState: {
        value: []
    },

    reducers: {
        setCurrentTestForEdit: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setCurrentTestForEdit } = currentTestForEditSlice.actions;
export default currentTestForEditSlice.reducer;