import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorGlobal, successGlobal } from '../reducers/notifications'
import axios from 'axios'
import { getAuthHeader, getTokenCookie } from '../../utils/tools'
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export const homeExcercises = createAsyncThunk(
    'home',
    async()=>{
        try {
            const request = await axios.get("http://localhost:8080", getAuthHeader());
            // dispatch(successGlobal('Welcome!!'))
            console.log("tossssssen kookie: ")
            console.log(getTokenCookie())
            if(getTokenCookie() === undefined) {
                console.log("helloooooooooo")
            }
            console.log(request.data);
        } catch(error) {
            console.log("token kookie: ")
            console.log(getTokenCookie())
            if(getTokenCookie === undefined) {
                console.log("helloooooooooo")
            }
            // dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)