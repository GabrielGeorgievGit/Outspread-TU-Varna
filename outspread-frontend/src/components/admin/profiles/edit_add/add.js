import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminTitle, errorHelper } from "../../../../utils/tools";
import { formValues, validation } from "./validationSchema";

import { useDispatch, useSelector } from "react-redux";
// MUI
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
 
import { Card } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { getAllSpecialties } from "../../../../store/actions/specialties";
import { addUser } from "../../../../store/actions/users";

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

    const [role, setRole] = useState("student");

    return (
        <Card className="Card " style={{backgroundColor: '#A1BDE333'}}>
            <AdminTitle title="Добави профил"/>
            <FormControl fullWidth>
                <InputLabel>Избери тип на профил</InputLabel>
                <Select defaultValue="student" onChange={(event) => setRole(event.target.value)}
                name="profile"
                label="Select profile"
                error={formik.errors.status && formik.touched.status ? true : false}
                >
                    <MenuItem value="student">Студент</MenuItem>
                    <MenuItem value="teacher">Преподавател</MenuItem>
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
                        label="Потребителско име"
                        variant="outlined"
                        {...formik.getFieldProps('username')}
                        {...errorHelper(formik, 'username')}/>
                </div>

                <div className="form-group">
                    <TextField
                            type="password"
                            style={{width: '30%'}}
                            name="password"
                            label="Парола"
                            variant="outlined"
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}/>
                </div>

                <div className="form-group">
                    <TextField
                        style={{width: '30%'}}
                        name="fullname"
                        label="Пълно име"
                        variant="outlined"
                        {...formik.getFieldProps('fullname')}
                        {...errorHelper(formik, 'fullname')}/>
                        
                </div>
                <div className="form-group" hidden = {role === 'student' ? false : true}>
                    <TextField
                        style={{width: '30%'}}
                        name="fn"
                        label="Студентски номер"
                        variant="outlined"
                        {...formik.getFieldProps('fn')}
                        {...errorHelper(formik, 'fn')}/>
                </div>
                
                <div className="form-group">
                    <FormControl style={{width: '30%'}}>
                        <InputLabel>Специалност</InputLabel>
                        <Select
                        name="specialtyId"
                        label="Специалност"
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
                
                <div className="form-group" hidden = {role === 'student' ? false : true}>
                    <TextField
                        style={{width: '30%'}}
                        name="semester"
                        label="Семестър"
                        variant="outlined"
                        {...formik.getFieldProps('semester')}
                        {...errorHelper(formik, 'semester')}/>
                </div>

                <div className="mt-4">
                        <Button variant="contained" color="primary" type="submit"
                        size="large" disabled={!formik.isValid}>
                            Добави
                        </Button>
                    </div>

            </form>
        </Card>
    )
}

export default AddProfile;