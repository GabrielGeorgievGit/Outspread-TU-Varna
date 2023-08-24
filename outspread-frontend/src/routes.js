import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { isAuth } from './store/actions/users';
import { Loader } from './utils/tools';

import MainLayout from './hoc/mainLayout';
import Header from './components/navigation/header';
import Home from './components/home';
import Login from './components/login';
import { useEffect, useState } from 'react';
import { homeExcercises } from './store/actions/home';
import { isAuth } from './store/actions/users';
import AuthGuard from './hoc/authGuard';
import { adminIsAuth } from './store/actions/admins';
import AdminHome from './components/admin';
import AdminLogin from './components/login/adminLogin';
import AdminMain from './components/admin/main';
import AdminProfiles from './components/admin/profiles';
import AdminExercises from './components/admin/exercises';
import AdminSpecialties from './components/admin/specialties';
import AddExercise from './components/admin/exercises/edit_add/add';
import AddSpecialty from './components/admin/specialties/edit_add/add';
import AddProfile from './components/admin/profiles/edit_add/add';
import AdminAuthGuard from './hoc/adminAuthGuard';
import ViewExercise from './components/home/exercises';

const Router = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    const admins = useSelector(state => state.admins)
    const usersGet = useSelector(state => state.usersGet)
    const specialties = useSelector(state => state.specialties)
    
    useEffect(()=> {
        dispatch(isAuth())
    },[dispatch])

    useEffect(()=> {
        if(users.auth !== null) {
            setLoading(false)
        }
    },[users, admins, usersGet, specialties])
    
    useEffect(()=> {
        dispatch(homeExcercises())
    },[dispatch])

    return (
        <BrowserRouter>
            {
                loading ?
                <Loader/>
                :
            <>
                <Header/>
                
                <MainLayout>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/admin/login' element={<AdminLogin/>}/>

                        <Route path='/' element= {<AuthGuard><Home/></AuthGuard>} />
                        <Route path='/exercise/:id' element= {<AuthGuard><ViewExercise /></AuthGuard>} />

                        <Route path='/admin' element= {<AdminAuthGuard><AdminHome/></AdminAuthGuard>}>
                            <Route index element={<AdminMain/>}/>
                            <Route path='profiles'  element={<AdminProfiles/>}/>
                            <Route path='profiles/add'  element={<AddProfile/>}/>
                            <Route path='exercises' element={<AdminExercises/>}/>
                            <Route path='exercises/add' element={<AddExercise/>}/>
                            <Route path='specialties' element={<AdminSpecialties/>}/>
                            <Route path='specialties/add' element={<AddSpecialty/>}/>
                        </Route>
                    </Routes>
                </MainLayout>
            </>
        }
        
        </BrowserRouter>
        
    )
}

export default Router;