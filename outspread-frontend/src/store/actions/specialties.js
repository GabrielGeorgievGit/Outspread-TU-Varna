import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeader } from "../../utils/tools";


export const getAllSpecialties = createAsyncThunk(
    'specialties/getAllSpecialties',
    async(exercise, {dispatch})=>{
        try{
            const request = await axios.get(`/specialty/all`, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)

export const addSpecialty = createAsyncThunk(
    'specialties/add',
    async(specialty, {dispatch})=>{
        try{
            console.log(specialty);
            const request = await axios.post(`/specialty/add`, specialty, getAuthHeader());
            console.log(request.data);
            return request.data;
        }catch(error){
            throw error
        }
    }
)