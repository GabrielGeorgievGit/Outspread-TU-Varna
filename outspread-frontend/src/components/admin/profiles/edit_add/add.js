import { useState, useRef, useEffect } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";

import { AdminTitle } from "../../../../utils/tools"
import { errorHelper, Loader } from "../../../../utils/tools";
import { validation, formValues } from "./validationSchema";

import { useDispatch, useSelector } from "react-redux";
// MUI
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button' 
import Divider from '@mui/material/Divider' 
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
 
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { addExercise } from "../../../../store/actions/exercises";
import { Dropdown } from "react-bootstrap";
import { addUser } from "../../../../store/actions/users";
import { getAllSpecialties } from "../../../../store/actions/specialties";
import { Card } from "@mui/material";

const AddProfile = () => {

    const specialties = useSelector(state => state.specialties)
    const dispatch = useDispatch();

    const actorsValue = useRef('');
    let navigate = useNavigate();

    useEffect(()=>{
        dispatch(getAllSpecialties())
    },[dispatch])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values) => {
            dispatch(addUser({...values, role}))
            .unwrap()
            .then(()=>{
                navigate('/admin/profiles')
            })
        }
    })

    const [role, setRole] = useState("STUDENT");

    return (
        <Card className="Card " style={{backgroundColor: '#A1BDE333'}}>
            <AdminTitle title="Add profile"/>
            <FormControl fullWidth>
                <InputLabel>Select user type</InputLabel>
                <Select defaultValue="student" onChange={(event) => setRole(event.target.value)}
                name="profile"
                label="Select profile"
                error={formik.errors.status && formik.touched.status ? true : false}
                >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                </Select>
                {formik.errors.status && formik.touched.status ?
                
                <FormHelperText error="true">
                    { formik.errors.status }
                </FormHelperText>
                :null}

            </FormControl>

            <form className="m5-3 article_form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{width: '30%'}}
                        name="username"
                        label="Enter a username"
                        variant="outlined"
                        {...formik.getFieldProps('username')}
                        {...errorHelper(formik, 'username')}/>
                </div>

                <div className="form-group">
                    <TextField
                            type="password"
                            style={{width: '30%'}}
                            name="password"
                            label="Enter a password"
                            variant="outlined"
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}/>
                </div>

                <div className="form-group">
                    <TextField
                        style={{width: '30%'}}
                        name="fullname"
                        label="Enter user's full name"
                        variant="outlined"
                        {...formik.getFieldProps('fullname')}
                        {...errorHelper(formik, 'fullname')}/>
                        
                </div>
                <div className="form-group">
                    <TextField
                        style={{width: '30%'}}
                        name="fn"
                        label="Enter student number"
                        variant="outlined"
                        {...formik.getFieldProps('fn')}
                        {...errorHelper(formik, 'fn')}/>
                </div>
                
                <div className="form-group">
                    <FormControl style={{width: '30%'}}>
                        <InputLabel>Select specialty</InputLabel>
                        <Select
                        name="specialtyId"
                        label="Select specialty"
                        {...formik.getFieldProps('specialtyId')}
                        error={formik.errors.status && formik.touched.status ? true : false}
                        >
                            {specialties.all.map(specialty => (
                                <MenuItem key={specialty.specialtyId} value={specialty.specialtyId}>{specialty.specialtyName}</MenuItem>
                                ))}
                            
                        </Select>
                        {formik.errors.status && formik.touched.status ?
                        
                        <FormHelperText error="true">
                            { formik.errors.status }
                        </FormHelperText>
                        :null}

                    </FormControl>
                </div>
                
                <div className="form-group">
                    <TextField
                        style={{width: '30%'}}
                        name="semester"
                        label="Enter semester"
                        variant="outlined"
                        {...formik.getFieldProps('semester')}
                        {...errorHelper(formik, 'semester')}/>
                </div>

                <div className="mt-4">
                        <Button variant="contained" color="primary" type="submit"
                        size="large" disabled={!formik.isValid}>
                            Add profile
                        </Button>
                    </div>

            </form>
        </Card>
    )
}

export default AddProfile;