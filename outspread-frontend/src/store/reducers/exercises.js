import { createSlice } from "@reduxjs/toolkit";
import { addExercise } from "../actions/exercises";

export const exercisesSlice = createSlice({
    name:'exercises',
    initialState: {
        homeSort: {},
        loading: false,
        exercises: [],
        current: null
    },
    reducers: {

    },
    extraReducers:(builder)=>{
        builder
        //create
        .addCase(addExercise.pending, state=>{state.loading = true})
        .addCase(addExercise.fulfilled, (state, action)=>{
            state.loading = false;
            state.lastAdded = action.payload
        })
        .addCase(addExercise.rejected, state=>{state.loading = false})
    }
})

export default exercisesSlice.reducer