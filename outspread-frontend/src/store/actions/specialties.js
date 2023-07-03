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