import { Routes, Route, BrowserRouter, Redirect, useNavigate, Navigate } from 'react-router-dom';
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

const Router = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    
    useEffect(()=> {
        dispatch(isAuth())
    },[dispatch])

    useEffect(()=> {
        if(users.auth !== null) {
            setLoading(false)
        }
    },[users])
    
    useEffect(()=> {
        dispatch(homeExcercises)
    },[dispatch])

    return (
        <BrowserRouter>
        <>
           
        </>
            {
                loading ?
                <Loader/>
                :
            <>
                <Header/>
                
                <MainLayout>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/' element= {<AuthGuard><Home/></AuthGuard>} />
                    </Routes>
                </MainLayout>
            </>
        }
        
        </BrowserRouter>
        
    )
}

export default Router;