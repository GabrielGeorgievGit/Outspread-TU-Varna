import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorGlobal, successGlobal } from '../reducers/notifications'
import axios from 'axios'
import { getAuthHeader } from '../../utils/tools'

export const loginUser = createAsyncThunk(
    'user/login',
    async({username, password}, {dispatch})=>{
        try {
            const request = await axios.post(`/login`, {
                username: username,
                password: password
            })
            dispatch(successGlobal('Welcome!!'))

            return { data: request.data, auth: true}
        } catch(error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)

export const isAuth = createAsyncThunk(
    'user/isAuth',
    async()=>{
        try {
            const request = await axios.get('/api/auth/isauth', getAuthHeader());
            return { data: request.data, auth: true }
        } catch(error) {
            return { data: {}, auth: false }
        }
    }
)