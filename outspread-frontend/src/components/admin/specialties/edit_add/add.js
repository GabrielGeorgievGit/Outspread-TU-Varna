import { useState, useRef } from "react";
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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
 
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { addExercise } from "../../../../store/actions/exercises";
import { addSpecialty } from "../../../../store/actions/specialties";

const AddSpecialty = () => {

    const dispatch = useDispatch();

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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values) => {

        }
    })

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
                {/*
            <AdminTitle title="Edit specialty"/>

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