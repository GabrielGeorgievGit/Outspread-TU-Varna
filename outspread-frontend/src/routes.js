import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { isAuth } from './store/actions/users';
import { Loader } from './utils/tools';

import MainLayout from './hoc/mainLayout';
import Header from './components/navigation/header';
import Home from './components/home';
import Login from './components/login';
import { useEffect, useState } from 'react';
import { homeExcercises } from './store/actions/home';

const Router = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    /*
    useEffect(()=> {
        dispatch(isAuth())
    },[])

    useEffect(()=> {
        if(users.auth !== null) {
            setLoading(false)
        }
    },[users])
    */
    useEffect(()=> {
        dispatch(homeExcercises)
    },[dispatch])

    return (
        <BrowserRouter>
            
            <>
                <Header/>
                <MainLayout>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/' element={<Home/>} />
                    </Routes>
                </MainLayout>
            </>
            
        </BrowserRouter>
        
    )
}

export default Router;