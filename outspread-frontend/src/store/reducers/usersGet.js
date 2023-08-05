import { createSlice } from "@reduxjs/toolkit";
import { 

    getAllUsers,
    getUserSemester,
    getUserSpecialtiesSemester
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
        // get all users
        .addCase(getAllUsers.rejected, (state)=> { state.loading = false })
        .addCase(getAllUsers.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
        // get all users filter specialties semester
        .addCase(getUserSpecialtiesSemester.rejected, (state)=> { state.loading = false })
        .addCase(getUserSpecialtiesSemester.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
    }
})

export default usersGetSlice.reducer
