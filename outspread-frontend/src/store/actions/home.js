import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorGlobal, successGlobal } from '../reducers/notifications'
import axios from 'axios'
import { getAuthHeader, getTokenCookie } from '../../utils/tools'
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export const homeExcercises = createAsyncThunk(
    'homeExcercises',
    async()=>{
        const navigate = useNavigate();
        try {
            const request = await axios.get("http://localhost:8080", getAuthHeader());
            
            // console.log(request.data);
        } catch(error) {
            
            navigate("/login")
            
            throw error;
        }
    }
)