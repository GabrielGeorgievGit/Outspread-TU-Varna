import { useFormik } from "formik";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { AdminTitle, errorHelper } from "../../../../utils/tools";
// MUI
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
 
import InputLabel from '@mui/material/InputLabel';
import { addSpecialty, changeSpecialty, getAllDisciplines, getAllSpecialties } from "../../../../store/actions/specialties";
// import makeAnimated from 'react-select/animated';
import { Autocomplete, Select } from "@mui/material";
import makeAnimated from 'react-select/animated';

const AddSpecialty = () => {

    const dispatch = useDispatch();
    const specialties = useSelector(state=>state.specialties)

    const [specialty, setSpecialty] = useState({id: 0, name: '', disciplines: []});
    const [semester, setSemester] = useState('1');
    const animatedComponents = makeAnimated();
    
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    
    
    useEffect(()=>{
        dispatch(getAllSpecialties())
        dispatch(getAllDisciplines())
    },[dispatch])
    
    useEffect(()=> {
        setDisciplines(specialty, semester)
    }, [specialty, semester])

    const specialtyAddFormik = useFormik({
        enableReinitialize: true,
        initialValues: {name: ''},
        validationSchema: Yup.object({
            name: Yup.string()
            .required('The specialty name field is required')
            .min(2, "Specialty name should be minimum 2 characters")
            .max(100, "Specialty name can't exceed 100 characters")
        }),
        onSubmit: (value) => {
            dispatch(addSpecialty(value))
            dispatch(getAllSpecialties())
        }
    })
    
    const specialtyEditFormik = useFormik({
        enableReinitialize: true,
        initialValues: {specialty: specialty.id, specialtyName: specialty.name, semester: semester, disciplines: selectedDisciplines},
        validationSchema: Yup.object({
            specialtyName: Yup.string()
            .required('The specialty name field is required')
            .min(2, "Specialty name should be minimum 2 characters")
            .max(100, "Specialty name can't exceed 100 characters")
        }),
        onSubmit: (values) => {
            dispatch(changeSpecialty(values))
        }
    })

    function selectSpecialty(specialty) {
        setSpecialty(specialty)
        setDisciplines(specialty, semester)
    }

    function setDisciplines(specialty, semester) {
        setSelectedDisciplines(specialty.disciplines.filter(item => item.semester === semester).map(item => item = {id: item.id, name: item.name}))
    }
    
    const editSpecialtyChanged = event => {
        specialtyEditFormik.setFieldValue("specialtyName", event.target.value)
    }

    function disciplineNames(arr) {
        let res = arr.map(item => item.name);
        console.log(res);
        return res;
    }

    function allDisciplinesSemester() {
        return specialty.disciplines.filter(item => item.semester === semester)
        // return specialties.all.map(specialty => specialty.specialtyName === specialty ? 
        //     specialty.disciplines.map(discipline => discipline.semester === semester ? {id: discipline.id, label: discipline.name} : null) : null)//.filter(item => item != null)
    }

    function getSpecialty(specialty) {
        return specialties.all.map(specialty => specialty.specialtyName === specialty)
    }

    function allSpecialties() {
        return specialties.all.map(item=>({id: item.specialtyId, name: item.specialtyName, disciplines: item.disciplines}   
        ))
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
                <form
                 className="m5-3 article_form"
                 onSubmit={specialtyEditFormik.handleSubmit}
                >
                    <div>
                        <Autocomplete
                            onChange={(event, value) => selectSpecialty({id: value.id, name: value.name, disciplines: value.disciplines})}
                            getOptionLabel={(option) => option.name}
                            disablePortal
                            options={allSpecialties()}
                            isOptionEqualToValue={(option, value)=> option.name === value.name}
                            renderInput={(params) => <TextField {...params} label="Specialty" />}
                            
                        />
                    </div>

                    <TextField
                        style={{width: '50%'}}
                        name="specialtyName"
                        label="Edit specialty name"
                        variant="outlined"
                        value={specialty.name}
                        {...specialtyEditFormik.getFieldProps('specialtyName')}
                        {...errorHelper(specialtyEditFormik, 'specialtyName')}
                    />
                    
                    <InputLabel>Semester</InputLabel>
                    <Select defaultValue="1" onChange={(event) => setSemester(event.target.value)}
                    name="semester"
                    label="semester"
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                    </Select>

                    <InputLabel>Disciplines</InputLabel>
                   <Autocomplete
                        multiple
                        disableCloseOnSelect
                        // id="tags-outlined"
                        options={specialties.disciplines}
                        getOptionLabel={(option) => option.name}
                        value={selectedDisciplines}
                        // defaultValue={specialty.disciplines.filter(item => item.semester === semester)}
                        filterSelectedOptions
                        onChange={(event, values)=> setSelectedDisciplines(values)}
                        isOptionEqualToValue={(option, value)=> option.name === value.name}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            // label="filterSelectedOptions"
                            // placeholder="Favorites"
                        />
                        )}
                    />

                    <div className="mt-2">
                        <Button variant="contained" color="primary" type="submit"
                        size="large" disabled={!specialtyEditFormik.isValid}>
                            Change specialty
                        </Button>
                    </div>
                </form>

        </>
    )
}

export default AddSpecialty;