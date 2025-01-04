import { createSlice } from "@reduxjs/toolkit";

const currentTestForDeleteSlice = createSlice({
    name: "currentTestForDelete",
    initialState: {
        value: []
    },

    reducers: {
        setCurrentTestForDelete: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setCurrentTestForDelete } = currentTestForDeleteSlice.actions;
export default currentTestForDeleteSlice.reducer;