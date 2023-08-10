import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const AdminAuthGuard = (props) => {
    const admins = useSelector(state => state.admins);
    let location = useLocation();

    if(!admins.auth) {
        return <Navigate to={"/admin/login"} state={{from: location}} replace/>
    }

    return props.children;
}

export default AdminAuthGuard;