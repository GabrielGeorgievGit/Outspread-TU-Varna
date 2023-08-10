import { useDispatch, useSelector } from "react-redux";
import { AdminTitle } from "../../utils/tools";
import { useEffect } from "react";
import { adminIsAuth } from "../../store/actions/admins";

const AdminMain = () => {

    const dispatch = useDispatch();
    const admin = useSelector(state => state.admins);

    useEffect(() => {
        dispatch(adminIsAuth())
    },[dispatch])

    return (
        <>
            <AdminTitle title="Admin"/>
            Hello {admin.data.username}
        </>
    )
}

export default AdminMain;