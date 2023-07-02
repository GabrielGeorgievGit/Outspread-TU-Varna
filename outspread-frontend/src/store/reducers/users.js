import { createSlice } from "@reduxjs/toolkit";
import { 
    loginUser,
    isAuth,
    signOut
} from '../actions/users'
let DEFAULT_USER_STATE = {
    loading: false,
    data: {
        id: null,
        username: null,
        password: null,
        fullname: null,
        fn: null,
        specialty: null,
        semester: null,
        role: null,
        exercisesOwned: []
    },
    auth: null
}

export const usersSlice = createSlice({
    name:'users',
    initialState: DEFAULT_USER_STATE,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder
        //login
        .addCase(loginUser.pending, (state)=>{ state.loading = true })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload.data;
            state.auth = action.payload.auth;
        })
        .addCase(loginUser.rejected, (state)=> { state.loading = false })
        // is auth
        .addCase(isAuth.pending, (state)=>{ state.loading = true })
        .addCase(isAuth.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = { ...state.data, ...action.payload.data }
            state.auth = action.payload.auth;
        })
        .addCase(isAuth.rejected, (state)=> { state.loading = false })
        // sign out
        .addCase(signOut.fulfilled, (state, action)=>{
            state.data = DEFAULT_USER_STATE.data
            state.auth = false;
        })
    }
})

export default usersSlice.reducer
