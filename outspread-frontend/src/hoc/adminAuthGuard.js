import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { adminIsAuth } from "../store/actions/admins";
import { getAuthHeader } from "../utils/tools";

const AdminAuthGuard = (props) => {
    const admins = useSelector(state => state.admins);
    let location = useLocation();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(adminIsAuth())
    },[dispatch])

    if(admins.auth === false) {
        return <Navigate to={"/admin/login"} state={{from: location}} replace/>
    }

    return props.children;
}

export default AdminAuthGuard;