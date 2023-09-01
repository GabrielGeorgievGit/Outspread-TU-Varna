import { Link as RouterLink } from "react-router-dom"
import { List, ListItemButton, ListItemText } from "@mui/material"

const AdminLayout = (props) => {

    return (
        <>
            <div className="row adminLayout">
                <nav className="col-md-2 d-none d-md-block sidebar">
                    <div>
                        <List>
                            <ListItemButton component={RouterLink} to="/admin/profiles">
                                <ListItemText primary="Профили"/>
                            </ListItemButton>

                            <ListItemButton component={RouterLink} to="/admin/exercises">
                                <ListItemText primary="Упражнения"/>
                            </ListItemButton>

                            <ListItemButton component={RouterLink} to="/admin/specialties">
                                <ListItemText primary="Специалности"/>
                            </ListItemButton>
                        </List>
                    </div>
                </nav>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    {props.children}
                </main>
            </div>
        </>
    )
}

export default AdminLayout;