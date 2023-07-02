import { Outlet } from "react-router-dom";
import AdminLayout from '../../hoc/adminLayout';

const AdminHome = () => {
    return (
        <AdminLayout>
            <Outlet/>
        </AdminLayout>
    )
}

export default AdminHome;