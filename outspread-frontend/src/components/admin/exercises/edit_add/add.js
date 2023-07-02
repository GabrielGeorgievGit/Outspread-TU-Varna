import { useState, useRef } from "react";
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

const AddExercise = () => {

    const exercises = useSelector(state => state.articles)
    const dispatch = useDispatch();

    const actorsValue = useRef('');
    let navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values) => {
            dispatch(addExercise(values))
            .unwrap()
            .then(()=>{
                navigate('/admin/exercises')
            })
        }
    })

    return (
        <>
            <AdminTitle title="Add exercise"/>

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
                    {/*  
                    <div className="form-group">
                        <FormikProvider value={formik}>
                            <FieldArray
                            name="actors"
                            render={ arrayHelpers => (
                                <div>
                                    <Paper className="actors_form">
                                        <InputBase
                                            inputRef={actorsValue}
                                            className="input"
                                            placeholder="Add actor name here"
                                            />
                                            <IconButton
                                                onClick={()=>{
                                                    if(actorsValue.current.value !== ''){
                                                        arrayHelpers.push(actorsValue.current.value)
                                                    }
                                                }}>
                                                <AddIcon/>
                                            </IconButton>
                                    </Paper>
                                </div>
                            )}/>
                        </FormikProvider>
                    </div>
                    */}

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
        </>
    )
}

export default AddExercise;