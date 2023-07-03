import { createSlice } from "@reduxjs/toolkit";
import { 

    getUserSemester
} from '../actions/users'
import { getAllSpecialties } from "../actions/specialties";


export const specialtiesSlice = createSlice({
    name:'specialties',
    initialState: {data: []},
    reducers: {

    },
    extraReducers:(builder)=>{
        builder
        
        .addCase(getAllSpecialties.pending, (state)=>{ state.loading = true })
        .addCase(getAllSpecialties.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
    }
})

export default specialtiesSlice.reducer
