import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/users'
import ExercisesReducer from './reducers/exercises'
import NotificationsReducer from './reducers/notifications'
import SiteReducer from './reducers/site'

export const store = configureStore({
    reducer:{
        users: UserReducer,
        exercises: ExercisesReducer,
        notifications: NotificationsReducer,
        site: SiteReducer
    }
})