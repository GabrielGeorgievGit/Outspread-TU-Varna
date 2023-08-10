import { createSlice } from "@reduxjs/toolkit";
import { adminIsAuth, loginAdmin } from "../actions/admins";
import { signOut } from "../actions/users";

let DEFAULT_ADMIN_STATE = {
    loading: false,
    data: {
        id: null,
        username: null,
        password: null,
        prime: false
    },
    auth: false
}

export const adminsSlice = createSlice({
    name:'admins',
    initialState: DEFAULT_ADMIN_STATE,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder
        //login
        .addCase(loginAdmin.pending, (state)=>{ state.loading = true })
        .addCase(loginAdmin.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload.data;
            state.auth = action.payload.auth;
        })
        .addCase(loginAdmin.rejected, (state)=> { state.loading = false })
        // is auth
        .addCase(adminIsAuth.pending, (state)=>{ state.loading = true })
        .addCase(adminIsAuth.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = { ...state.data, ...action.payload.data }
            state.auth = action.payload.auth;
        })
        .addCase(adminIsAuth.rejected, (state)=> { state.loading = false })
        // sign out
        .addCase(signOut.fulfilled, (state, action)=>{
            state.data = DEFAULT_ADMIN_STATE.data
            state.auth = false;
        })
    }
})

export default adminsSlice.reducer