import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { isAuth } from "../store/actions/users";

const AuthGuard = (props) => {
    const users = useSelector(state => state.users);
    let location = useLocation();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(isAuth())
    },[dispatch])

    if(users.auth === false) {
        return <Navigate to={"/login"} state={{from: location}} replace/>
    }

    return props.children;
}

export default AuthGuard;