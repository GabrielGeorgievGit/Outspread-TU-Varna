import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminIsAuth } from "../../store/actions/admins";
import { clearNotifications } from "../../store/reducers/notifications";
import { setLayout } from "../../store/reducers/site";
import { removeTokenCookie, showToast } from "../../utils/tools";

const Header = () => {
    const users = useSelector(state => state.users);
    const notifications = useSelector(state => state.notifications);
    const site = useSelector(state => state.site);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();
    const admins = useSelector(state => state.admins)

    const [pathname, setPathName] = useState(location.pathname.split('/'));

    useEffect(() => {
        setPathName(location.pathname.split('/'))

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
        // dispatch(isAuth());
        dispatch(adminIsAuth());

    },[dispatch])

    const signOutUser = () => {
        removeTokenCookie()
        window.location.reload(false);
        // if(pathname[1] === 'admin') navigate('/admin/login')
        // else navigate('/login')
        // navigate('/login')
    }

    let username = "";

    return (
        <nav className={`navbar fixed-top ${site.layout}`}>
            <Link to={admins.auth ? "/admin" : "/"} className="navbar-brand d-flex align-items-center fredoka_ff">
                TU Varna
            </Link>

            {/* <h3 style={{marginRight: '1px'}}>{username} aaa</h3> */}
            { users.auth || admins.auth ? 
                <>
                    <h4 style={{ float: 'right', display: 'flex'}}>{users.data.fullname}</h4>
                    <button className="button-28" style={{marginRight: '20px'}} onClick={()=>signOutUser()}>sign out</button>
                </>
                :
                null
            }
        </nav>
    )
}


export default Header