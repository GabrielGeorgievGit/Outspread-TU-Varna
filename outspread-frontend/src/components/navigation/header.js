import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearNotifications } from "../../store/reducers/notifications";
import { showToast } from "../../utils/tools";
import { signOut } from "../../store/actions/users";


const Header = () => {
    const users = useSelector(state => state.users)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(()=>{
        let { global } = notifications;
        if(notifications && global.error) {
            const msg = global.msg ? global.msg : 'Error';
            showToast('ERROR', msg)
            dispatch(clearNotifications())
        }
        if(notifications && global.success) {
            const msg = global.msg ? global.msg : 'Success';
            showToast('SUCCESS', msg)
            dispatch(clearNotifications())
        }
    },[dispatch, notifications])

    const signOutUser = () => {
        dispatch(signOut())
        navigate('/login')
    }

    return (
        <nav className='navbar fixed-top'>
            <Link to="/" className="navbar-brand d-flex align-items-center fredoka_ff">
                TU Varna
            </Link>
            <button onClick={()=>signOutUser()}>sign out</button>
        </nav>
    )
}


export default Header