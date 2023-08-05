import { createSlice } from "@reduxjs/toolkit";
import { 

    getUserSemester
} from '../actions/users'
import { getAllAllSpecialties, getAllSpecialties, getAllSpecialtiesSemester, getSpecialtiesSemester } from "../actions/specialties";


export const specialtiesSlice = createSlice({
    name:'specialties',
    initialState: {data: [], all: []},
    reducers: {

    },
    extraReducers:(builder)=>{
        builder
        
        .addCase(getAllSpecialties.pending, (state)=>{ state.loading = true })
        .addCase(getAllSpecialties.fulfilled, (state, action)=>{
            state.data = action.payload
            state.all = action.payload
        })
        .addCase(getAllSpecialtiesSemester.pending, (state)=>{ state.loading = true })
        .addCase(getAllSpecialtiesSemester.fulfilled, (state, action)=>{
            state.data = action.payload
        }) 
        .addCase(getSpecialtiesSemester.pending, (state)=>{ state.loading = true })
        .addCase(getSpecialtiesSemester.fulfilled, (state, action)=>{
            state.data = action.payload
        })
        .addCase(getAllAllSpecialties.pending, (state)=>{ state.loading = true })
        .addCase(getAllAllSpecialties.fulfilled, (state, action)=>{
            state.all = action.payload
        })
    }
})

export default specialtiesSlice.reducer
