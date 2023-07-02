import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorGlobal, successGlobal } from '../reducers/notifications'
import axios from 'axios'
import cookie from 'react-cookies'
import { getAuthHeader } from '../../utils/tools'

export const loginAdmin = createAsyncThunk(
    'admin/login',
    async({username, password}, {dispatch})=>{
        console.log("login admin")
        try {
            const request = await axios.post(`http://localhost:8080/admin/login`, {
                username: username,
                password: password
            })
            dispatch(successGlobal('Welcome!!'))
            const jwtToken = request.headers["authorization"];
            cookie.save("final-access-token", jwtToken);
            
            return { data: request.data, auth: true}
        } catch(error) {
            dispatch(errorGlobal("Wrong username or password"))
            throw error;
        }
    }
)

export const adminIsAuth = createAsyncThunk(
    'admin/adminIsAuth',
    async()=>{
        try {
            const request = await axios.get('/admin/login', getAuthHeader());
            
            return { data: request.data, auth: true }
        } catch(error) {
            return { data: {}, auth: false }
        }
    }
)