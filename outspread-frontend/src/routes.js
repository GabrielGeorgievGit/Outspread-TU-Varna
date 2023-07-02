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

const Router = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    const admins = useSelector(state => state.admins)
    
    useEffect(()=> {
        dispatch(isAuth())
    },[dispatch])

    useEffect(()=> {
        if(users.auth !== null) {
            setLoading(false)
        }
    },[users, admins])
    
    useEffect(()=> {
        dispatch(homeExcercises)
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

                        <Route path='/admin' element= {<AdminHome/>}>
                            <Route index element={<AdminMain/>}/>
                            <Route path='profiles'  element={<AdminProfiles/>}/>
                            <Route path='exercises' element={<AdminExercises/>}/>
                            <Route path='exercises/add' element={<AddExercise/>}/>
                            <Route path='specialties' element={<AdminSpecialties/>}/>
                        </Route>
                    </Routes>
                </MainLayout>
            </>
        }
        
        </BrowserRouter>
        
    )
}

export default Router;