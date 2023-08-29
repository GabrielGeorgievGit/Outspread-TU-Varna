import { useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { errorHelper, Loader } from "../../utils/tools";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import SignGuard from "../../hoc/signGuard";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../store/actions/admins";
import { Card } from "@mui/material";

const AdminLogin = () => {
    
    // const [register, setRegister] = useState(true);
    let navigate = useNavigate()
    //redux
    const users = useSelector(state => state.users);
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {username: 'pesho', password: 'pesho'},
        validationSchema: Yup.object({
            username: Yup.string()
            .required('The username field is required'),
            password: Yup.string()
            .required('The password field is required')
            .min(3)
            .max(10)
            
        }),
        onSubmit: (values)=> {
            handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        dispatch(loginAdmin(values))
    }

    useEffect(()=>{
        if(notifications && notifications.global.success) {
            navigate('/admin')
        }
    },[notifications, navigate])

    return (
        <SignGuard users={users}>
            <div className="auth_container">
                <h1>Login</h1>
                { users.loading ? 
                    <Loader/>
                    :
                    <Box
                        sx={{
                            '& .MuiTextField-root': { width: '100%', marginTop: '20px' },
                        }}
                        component="form"
                        onSubmit={formik.handleSubmit}
                    >

                        <TextField
                            name="username"
                            label="Enter your username"
                            variant='outlined'
                            {...formik.getFieldProps('username')}
                            {...errorHelper(formik, 'username')}
                        />

                        <TextField
                            name="password"
                            label="Enter your password"
                            type="password"
                            variant='outlined'
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}
                        />

                        <div className="mt-2">
                            <Button variant="contained" color="primary" type="submit"
                            size="large" disabled={!formik.isValid}>
                                {'Login'}
                            </Button>
                        </div>

                    </Box>
                }
            </div>
        </SignGuard>
    )
}

export default AdminLogin;