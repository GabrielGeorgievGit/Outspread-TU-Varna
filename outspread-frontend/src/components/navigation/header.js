import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearNotifications } from "../../store/reducers/notifications";
import { removeTokenCookie, showToast } from "../../utils/tools";
import { isAuth, signOut } from "../../store/actions/users";
import { setLayout } from "../../store/reducers/site";
import { adminIsAuth } from "../../store/actions/admins";

const Header = () => {
    const users = useSelector(state => state.users);
    const notifications = useSelector(state => state.notifications);
    const site = useSelector(state => state.site);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();
    const admins = useSelector(state => state.admins)

    useEffect(() => {
        let pathname = location.pathname.split('/')
        if(pathname[1] === 'admin') {
            dispatch(setLayout('dash_layout'))
        }else {
            dispatch(setLayout(''))
        }
    },[location.pathname, dispatch])

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

    useEffect(() => {
        dispatch(isAuth());
        dispatch(adminIsAuth());

    },[dispatch])

    const signOutUser = () => {
        removeTokenCookie()
        window.location.reload(false);
        // navigate('/login')
    }

    let username = "";

    return (
        <nav className={`navbar fixed-top ${site.layout}`}>
            <Link to={admins.auth ? "/admin" : "/"} className="navbar-brand d-flex align-items-center fredoka_ff">
                TU Varna
            </Link>

            <h3 style={{marginRight: '1px'}}>{username}</h3>
            { users.auth || admins.auth ? 
                <>
                    <h3 style={{marginRight: '1px'}}>{users.data.fullname}</h3>
                    <button onClick={()=>signOutUser()}>sign out</button>
                </>
                :
                null
            }
        </nav>
    )
}


export default Header