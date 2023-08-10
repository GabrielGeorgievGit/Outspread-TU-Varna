import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/users'
import ExercisesReducer from './reducers/exercises'
import NotificationsReducer from './reducers/notifications'
import SiteReducer from './reducers/site'
import UsersGetReducer from './reducers/usersGet'
import SpecialtiesReducer from './reducers/specialties'
import AdminReducer from './reducers/admins'

export const store = configureStore({
    reducer:{
        admins: AdminReducer,
        users: UserReducer,
        exercises: ExercisesReducer,
        notifications: NotificationsReducer,
        site: SiteReducer,
        usersGet: UsersGetReducer,
        specialties: SpecialtiesReducer
    }
})