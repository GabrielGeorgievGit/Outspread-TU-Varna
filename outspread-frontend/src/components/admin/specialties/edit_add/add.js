import { useState, useRef, useEffect } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";

import { AdminTitle } from "../../../../utils/tools"
import { errorHelper, Loader } from "../../../../utils/tools";
import { validation, formValues } from "./validationSchema";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
// MUI
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button' 
import Divider from '@mui/material/Divider' 
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
 
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { addExercise } from "../../../../store/actions/exercises";
import { addSpecialty, getAllSpecialties } from "../../../../store/actions/specialties";
import { Dropdown, Form } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
// import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const AddSpecialty = () => {

    const dispatch = useDispatch();
    const specialties = useSelector(state=>state.specialties)

    const animatedComponents = makeAnimated();

    
    useEffect(()=>{
        dispatch(getAllSpecialties())
    },[dispatch])
    
    const specialtyAddFormik = useFormik({
        enableReinitialize: true,
        initialValues: {name: ''},
        validationSchema: Yup.object({
            name: Yup.string()
            .required('The specialty name field is required')
            .min(2, "Specialty name should be minimum 2 characters")
            .max(100, "Specialty name can't exceed 100 characters")
        }),
        onSubmit: (values) => {
            dispatch(addSpecialty(values))
        }
    })
    
    const specialtyEditFormik = useFormik({
        enableReinitialize: true,
        initialValues: {specialty: '', specialtyName: '', disciplines: []},
        validationSchema: Yup.object({
            specialtyName: Yup.string()
            .required('The specialty name field is required')
            .min(2, "Specialty name should be minimum 2 characters")
            .max(100, "Specialty name can't exceed 100 characters")
        }),
        onSubmit: (values) => {
            
        }
    })
    
    const editSpecialtyChanged = event => {
        specialtyEditFormik.setFieldValue("specialtyName", event.target.value)
    }

    function disciplineNames(arr) {
        let res = arr.map(item => item.name);
        console.log(res);
        return res;
    }

    function allDisciplines() {
        console.log("here")
        let res = specialties.data.map(item=>item.disciplines)
        res = res.filter(item=>item.length > 0)
        
        console.log(res);

        // res = res.map(disc => disc.map(item=>item.name ? item.name : "kus"))
        console.log(res);
        return res
    }
    
    return (
        <>
            <AdminTitle title="Add new specialty"/>
            <form 
                className="m5-3 article_form"
                onSubmit={specialtyAddFormik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{width: '50%'}}
                        name="specialtyName"
                        label="New specialty to add"
                        variant="outlined"
                        {...specialtyAddFormik.getFieldProps('name')}
                        {...errorHelper(specialtyAddFormik, 'name')}
                        />

                    <div className="mt-2">
                        <Button variant="contained" color="primary" type="submit"
                        size="large" disabled={!specialtyAddFormik.isValid}>
                            Add specialty
                        </Button>
                    </div>
                </div>

            </form>
                
            <AdminTitle title="Edit specialty"/>
            <Form
                className="m5-3 article_form"
                onSubmit={specialtyEditFormik.handleSubmit}>
                <div className="form-group">
                    <Form.Select size="lg" name="specialty" onChange={editSpecialtyChanged}>
                       { specialties.data.map(item=>(
                           <option key={item.specialtyId}>{item.specialtyName}</option>
                       ))}
                    </Form.Select>
                    <TextField
                        style={{width: '50%'}}
                        name="specialtyName"
                        label="Edit specialty name"
                        variant="outlined"
                        {...specialtyEditFormik.getFieldProps('specialtyName')}
                        {...errorHelper(specialtyEditFormik, 'specialtyName')}
                    />

                    <Select
                        closeMenuOnSelect={false}
                        // components={animatedComponents}
                        // defaultValue={disciplineNames(specialties.data[1].disciplines)}
                        isMulti
                        options={allDisciplines()}
                    >
                        {/* { allDisciplines().map(item=>(
                            <option key={item.id}>{item.name}</option>
                        ))} */}
                    </Select>
                    

                    <div className="mt-2">
                        <Button variant="contained" color="primary" type="submit"
                        size="large" disabled={!specialtyEditFormik.isValid}>
                            Change specialty
                        </Button>
                    </div>
                </div>

            </Form>
            {
            /*
            <AdminTitle title="Add discipline"/>

            <form className="m5-3 article_form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{width: '30%'}}
                        name="title"
                        label="Enter a title"
                        variant="outlined"
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik, 'title')}/>
                </div>

                <div className="form-group">
                    WSSS
                </div>

                <div className="form-group">
                    <TextField
                        style={{width: '100%'}}
                        name="discipline"
                        label="Enter a discipline"
                        variant="outlined"
                        {...formik.getFieldProps('discipline')}
                        {...errorHelper(formik, 'discipline')}
                        multiline
                        rows={4}
                        />
                    
                    <Divider className="mt-3 mb-3"/>

                    <div className="form-group">
                        <TextField
                            style={{width: '100%'}}
                            name="teacher"
                            label="Enter a teacher"
                            variant="outlined"
                            {...formik.getFieldProps('teacher')}
                            {...errorHelper(formik, 'teacher')}/>
                    </div>

                    <div className="form-group">
                        Actors
                    </div>

                    <FormControl fullWidth>
                        <InputLabel>Select status</InputLabel>
                        <Select 
                        name="status"
                        label="Select status"
                        {...formik.getFieldProps('director')}
                        error={formik.errors.status && formik.touched.status ? true : false}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="public">Public</MenuItem>
                        </Select>
                        {formik.errors.status && formik.touched.status ?
                        
                        <FormHelperText error="true">
                            { formik.errors.status }
                        </FormHelperText>
                        :null}

                    </FormControl>
                </div>

            </form>
                        */}
        </>
    )
}

export default AddSpecialty;