import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/users'
import ExercisesReducer from './reducers/exercises'

export const store = configureStore({
    reducer:{
        users: UserReducer,
        exercises: ExercisesReducer
    }
})