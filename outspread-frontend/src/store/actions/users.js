import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorGlobal, successGlobal } from '../reducers/notifications'
import axios from 'axios'
import { getAuthHeader, removeTokenCookie } from '../../utils/tools'
import cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom'

export const loginUser = createAsyncThunk(
    'user/login',
    async({username, password}, {dispatch})=>{
        try {
            const request = await axios.post(`http://localhost:8080/login`, {
                username: username,
                password: password
            })
            removeTokenCookie()
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
export const isAuth = createAsyncThunk(
    'user/isAuth',
    async()=>{
        try {
            const request = await axios.get('/login', getAuthHeader());
            
            return { data: request.data, auth: true }
        } catch(error) {
            return { data: {}, auth: false }
        }
    }
)


export const signOut = createAsyncThunk(
    'signOut',
    async()=>{
       removeTokenCookie();
    }
)

export const getUserSemester = createAsyncThunk(
    'user/findSemester',
    async(semester, {dispatch})=>{
        try {
            const request = await axios.post('http://localhost:8080/user/findAllSemester', {value: semester}, getAuthHeader());
            
            return request.data
        } catch(error) {
            
            throw error
        }
    }
)


export const getUserSpecialtiesSemester = createAsyncThunk(
    'user/getUserSpecialtiesSemester',
    async(specialtySemester, {dispatch})=>{
        try {
            const request = await axios.post('http://localhost:8080/user/find/specialty/semester', {specialty: specialtySemester.specialty, semester: specialtySemester.semester}, getAuthHeader());
            
            return request.data
        } catch(error) {
            
            throw error
        }
    }
)

export const getUserSpecialties = createAsyncThunk(
    'user/findSpecialties',
    async(specialty, {dispatch})=>{
        try {
            const request = await axios.post('http://localhost:8080/user/find/specialty', {value: specialty}, getAuthHeader());
            
            return request.data
        } catch(error) {
            
            throw error
        }
    }
)

export const getAllUsers = createAsyncThunk(
    'user/findAll',
    async()=>{
        console.log("hellooooooooosaoso")
        try {
            const request = await axios.get('http://localhost:8080/user/findAll', getAuthHeader());
            
            return request.data
        } catch(error) {
            
            throw error
        }
    }
)

export const addUser = createAsyncThunk(
    'profiles/addUser',
    async(user, {dispatch})=>{
        try{
            const request = await axios.post(`/user/create`, user, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)

/*
export const loginGet = createAsyncThunk(
    'get/login',
    async()=>{
        try {
            const request = await axios.get(`http://localhost:8080/login`)
            // dispatch(successGlobal('Welcome!!'))
            console.log("you made get request in login")
            console.log( request.data)
        } catch(error) {
            // dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)*/

