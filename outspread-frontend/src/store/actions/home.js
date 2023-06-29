import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorGlobal, successGlobal } from '../reducers/notifications'
import axios from 'axios'
import { getAuthHeader } from '../../utils/tools'
import jwtDecode from "jwt-decode";

export const homeExcercises = createAsyncThunk(
    'home',
    async()=>{
        try {
            const request = await axios.get("http://localhost:8080");
            // dispatch(successGlobal('Welcome!!'))
            
            console.log(request.data);
        } catch(error) {
            // dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)