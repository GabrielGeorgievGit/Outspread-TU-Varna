import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const AuthGuard = (props) => {
    const users = useSelector(state => state.users);
    let location = useLocation();
    let navigate = useNavigate();

    if(!users.auth) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    return props.children;
}

export default AuthGuard;