import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeader } from "../../utils/tools";
import { errorGlobal, successGlobal } from '../reducers/notifications'

export const getAllSpecialties = createAsyncThunk(
    'specialties/getAllSpecialties',
    async()=>{
        try{
            const request = await axios.get(`/specialty/all`, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)

export const getAllAllSpecialties = createAsyncThunk(
    'specialties/getAllAllSpecialties',
    async()=>{
        try{
            const request = await axios.get(`/specialty/all`, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)

export const getAllSpecialtiesSemester = createAsyncThunk(
    'specialties/getAllSpecialtiesSemester',
    async(semester, {dispatch})=>{
        try{
            const request = await axios.post(`/specialty/all/semester`, {value: semester}, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)

export const getSpecialtiesSemester = createAsyncThunk(
    'specialties/getSpecialtiesSemester',
    async(specialtySemester, {dispatch})=>{
        try{
            const request = await axios.post(`/specialty/semester`, {specialty: specialtySemester.specialty, semester: specialtySemester.semester}, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)

export const getSpecialty = createAsyncThunk(
    'specialties/getSpecialty',
    async(specialty)=>{
        try{
            const request = await axios.get(`/specialty/get`, specialty, getAuthHeader());
            
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
            const request = await axios.post(`/specialty/add`, specialty, getAuthHeader());
            
            dispatch(successGlobal("Specialty " + specialty.name + " added"))
            
            return request.data;
        }catch(error){
            dispatch(errorGlobal("This specialty already exists"))
        }
    }
)

export const getAllDisciplines = createAsyncThunk(
    'disciplines/getAllDisciplines',
    async()=>{
        try{
            const request = await axios.get(`/specialty/disciplines/all`, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)

export const changeSpecialty = createAsyncThunk(
    'specialty/change',
    async(specialty)=>{
        try{
            const request = await axios.put(`/specialty/change`, {id: specialty.specialty, name: specialty.specialtyName, semester: specialty.semester, disciplines: specialty.disciplines}, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)