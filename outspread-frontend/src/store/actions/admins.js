import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorGlobal, successGlobal } from '../reducers/notifications'
import axios from 'axios'
import cookie from 'react-cookies'
import { getAuthHeader, removeTokenCookie } from '../../utils/tools'

export const loginAdmin = createAsyncThunk(
    'admin/login',
    async({username, password}, {dispatch})=>{
        try {
            const request = await axios.post(`http://localhost:8080/admin/login`, {
                username: username,
                password: password
            })
            removeTokenCookie()
            dispatch(successGlobal('Добре дошли!'))
            const jwtToken = request.headers["authorization"];
            cookie.save("final-access-token", jwtToken);
            
            return { data: request.data, auth: true}
        } catch(error) {
            dispatch(errorGlobal("Грешно потребителско име или парола"))
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