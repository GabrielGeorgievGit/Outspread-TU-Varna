import { createSlice } from "@reduxjs/toolkit";

export const exercisesSlice = createSlice({
    name:'exercises',
    initialState: {
        homeSort: {},
        loading: false,
        exercises: [],
        current: null
    },
    reducers: {

    }
})

export default exercisesSlice.reducer