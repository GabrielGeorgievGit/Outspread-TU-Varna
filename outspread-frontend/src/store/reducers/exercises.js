import { createSlice } from "@reduxjs/toolkit";
import { addExercise, getAllExercises, getAllRooms, getExercise, removeCurrent } from "../actions/exercises";

export const exercisesSlice = createSlice({
    name:'exercises',
    initialState: {
        homeSort: {},
        loading: false,
        exercises: [],
        current: null,
        rooms: []
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
         // GET all Exercises
        .addCase(getAllExercises.pending,(state)=>{ state.loading = true })
        .addCase(getAllExercises.fulfilled,(state,action)=>{ 
            state.loading = false;
            state.exercises = action.payload

            state.current = null;
        })
        // GET ALL ROOMS
        .addCase(getAllRooms.pending,(state)=>{ state.loading = true })
         .addCase(getAllRooms.fulfilled,(state,action)=>{ 
             state.loading = false;
             state.rooms = action.payload
         })
        .addCase(getExercise.pending,(state)=>{ state.loading = true })
        .addCase(getExercise.fulfilled,(state,action)=>{ 
            state.loading = false;
            state.current = action.payload
        })
        .addCase(removeCurrent.pending,(state,action)=>{ 
            state.loading = false;
            state.current = null;
        })
    }
})

export default exercisesSlice.reducer