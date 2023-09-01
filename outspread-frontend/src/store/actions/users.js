import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorGlobal, successGlobal } from '../reducers/notifications'
import axios from 'axios'
import { getAuthHeader, removeTokenCookie } from '../../utils/tools'
import cookie from 'react-cookies'

export const loginUser = createAsyncThunk(
    'user/login',
    async({username, password}, {dispatch})=>{
        try {
            const request = await axios.post(`http://localhost:8080/login`, {
                username: username,
                password: password
            })
            removeTokenCookie()
            dispatch(successGlobal('Добре дошли!'))
            const jwtToken = request.headers["authorization"];
            cookie.save("final-access-token", jwtToken);
            
            return { data: request.data, auth: true}
        } catch(error) {
            dispatch(errorGlobal("Грешно име и парола"))
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
            dispatch(successGlobal("Профила е добавен"));
            return request.data;
        }catch(error){
            dispatch(errorGlobal("Профила не е добавен"));
            throw error
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async(id, {dispatch})=>{
        try{
            const request = await axios.delete(`/user/delete?id=${id}`, getAuthHeader());
            
            dispatch(successGlobal("Профила е изтрит"));

            return request.data;
        }catch(error){
            dispatch(errorGlobal("Профила не е изтрит"));
            throw error
        }
    }
)

