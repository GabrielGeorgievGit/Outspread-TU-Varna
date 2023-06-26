import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
    'user/login',
    async({username, password}, {dispatch})=>{
        try {
            const request = await axios.post(`/login`, {
                username: username,
                password: password
            })
            console.log(request.data)
            return { data: request.data, auth: true}
        } catch(error) {
            throw error;
        }
    }
)