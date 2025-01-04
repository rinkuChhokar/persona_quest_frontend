import { createSlice } from "@reduxjs/toolkit";

const allQuestionAndAnswerRecordSlice = createSlice({
    name: "allQuestionAndAnswerRecord",
    initialState: {
        value: []
    },

    reducers: {
        setAllQuestionAndAnswerRecord: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setAllQuestionAndAnswerRecord } = allQuestionAndAnswerRecordSlice.actions;
export default allQuestionAndAnswerRecordSlice.reducer;