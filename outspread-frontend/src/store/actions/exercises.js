import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthHeader } from "../../utils/tools";
import axios from "axios";
import { errorGlobal, successGlobal } from "../reducers/notifications";

export const addExercise = createAsyncThunk(
    'exercises/addExercise',
    async(exercise, {dispatch})=>{
        try{
            const request = await axios.post(`/exercise/create`, exercise, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)

export const getAllExercises = createAsyncThunk(
    'exercises/getAllExercises',
    async(exrcise)=>{
        try{
            const request = await axios.get(`/exercise/find/all`, getAuthHeader());
            
            return request.data;
        }catch(error){
            
        }
    }
)

export const getExercise = createAsyncThunk(
    'exercises/getExercise',
    async(id)=>{
        try{
            const request = await axios.get(`/exercise/find?id=${id}`, getAuthHeader());
            
            return request.data;
        }catch(error){
            
        }
    }
)

export const getPaginateExercises = createAsyncThunk(
    'exercises/getExercises',
    async({page=1,limit=5, keywords=''}, {dispatch})=>{
        try{
            const request = await axios.post(`/exercise/paginate`, {
                page,
                limit,
                keywords
            }, getAuthHeader());
            return request.data;
        }catch(error){
            throw error
        }
    }
)

export const userSignExercise = createAsyncThunk(
    'exercises/sign/user',
    async(sign, {dispatch})=>{
        try{
            const request = await axios.post(`/exercise/sign/user`, sign, getAuthHeader());
            dispatch(successGlobal("Signed for exercise"));
            
            return {...request.data, error: false};
        }catch(error){
            dispatch(errorGlobal("Unsuccessful sign for exercise"));
            return {error: true}
        }
    }
)

export const userSignOutExercise = createAsyncThunk(
    'exercises/signOut/user',
    async(sign, {dispatch})=>{
        try{
            const request = await axios.post(`/exercise/signOut/user`, sign, getAuthHeader())
            
            dispatch(successGlobal("Signed out of the exercise"));
            
            return {...request.data, error: false};
        }catch(error){
            dispatch(errorGlobal("Unsuccessful sign out of exercise"));
            return {error: true}
        }
    }
)

export const deleteOwnerExercise = createAsyncThunk(
    'exercises/deleteOwnerExercise',
    async(remove, {dispatch})=>{
        try{
            const request = await axios.delete(`/exercise/own/delete`, {userId: remove.userId, exerciseId: remove.exerciseId}, getAuthHeader())
            .then(response => {
                if(response.status === 200) {
                    dispatch({error: false})
                }
            });
            
            dispatch(successGlobal("Exercise deleted"));

            return request.data;
        }catch(error){
            dispatch({error: true})
            dispatch(errorGlobal("Couldn't delete the exercise"));
        }
    }
)

export const deleteExercise = createAsyncThunk(
    'exercises/deleteExercise',
    async(id, {dispatch})=>{
        try{
            const request = await axios.delete(`/exercise/delete?id=${id}`, getAuthHeader());
            
            dispatch(successGlobal("Exercise deleted"));

            return request.data;
        }catch(error){
            dispatch(errorGlobal("Couldn't delete the exercise"));
        }
    }
)

export const getAllRooms = createAsyncThunk(
    'exercises/getAllRooms',
    async()=>{
        try{
            const request = await axios.get(`/exercise/room/all`, getAuthHeader());
            
            return request.data;
        }catch(error){
            throw error
        }
    }
)

export const removeCurrent = createAsyncThunk()