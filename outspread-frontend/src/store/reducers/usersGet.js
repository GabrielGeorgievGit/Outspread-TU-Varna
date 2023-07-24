import { createSlice } from "@reduxjs/toolkit";
import { 

    getUserSemester
} from '../actions/users'


export const usersGetSlice = createSlice({
    name:'usersGet',
    initialState: {data: []},
    reducers: {

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUserSemester.pending, (state)=>{ state.loading = true })
        .addCase(getUserSemester.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
    }
})

export default usersGetSlice.reducer
