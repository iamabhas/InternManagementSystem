import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    batchId : null,
    batchName:null,
    interns:[],
    mentors:[]
};

export const batchSelectSlice = createSlice({
    name: "batchSelect",
    initialState,
    reducers: {
        setBatch: (state, action) => {
            state.batchId= action.payload._id;
            state.batchName=action.payload.name;
            state.batchInterns=action.payload.interns;
            state.batchMentors=action.payload.mentor;
        }
    },
});
export const { setBatch } = batchSelectSlice.actions;
export default batchSelectSlice.reducer;
