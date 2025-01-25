import { createSlice } from "@reduxjs/toolkit";

const answersSlice = createSlice({
    name: "answers",
    initialState: {
        value: []
    },

    reducers: {
        setAnswers: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setAnswers } = answersSlice.actions;
export default answersSlice.reducer;