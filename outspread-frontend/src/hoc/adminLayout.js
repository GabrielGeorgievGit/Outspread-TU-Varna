import { Link as RouterLink } from "react-router-dom"
import { List, ListItemButton, ListItemText } from "@mui/material"

const AdminLayout = (props) => {

    return (
        <>
            <div className="row adminLayout">
                <nav className="col-md-2 d-nono d-md-block sidebar">
                    <div>
                        <List>
                            <ListItemButton componnet={RouterLink} to="/admin/profiles">
                                <ListItemText primary="Profiles"/>
                            </ListItemButton>

                            <ListItemButton componnet={RouterLink} to="/admin/exercises">
                                <ListItemText primary="Exercises"/>
                            </ListItemButton>
                        </List>
                    </div>
                </nav>
                <main reole="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    {props.children}
                </main>
            </div>
        </>
    )
}

export default AdminLayout;