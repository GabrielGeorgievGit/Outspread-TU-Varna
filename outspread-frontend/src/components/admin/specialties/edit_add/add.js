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

import { Autocomplete, Card, Select } from "@mui/material";

const AddSpecialty = () => {

    const dispatch = useDispatch();
    const specialties = useSelector(state=>state.specialties)

    const [specialty, setSpecialty] = useState({id: 0, name: '', disciplines: []});
    const [semester, setSemester] = useState('1');
    
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
            .required('Задължително поле')
            .min(2, "Полето не може да бъде под 2 символа")
            .max(100, "Полето не може да надвишава 100 символа")
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
            .required('Задължително поле')
            .min(2, "Полето не може да бъде под 2 символа")
            .max(100, "Полето не може да надвишава 100 символа")
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

    function allSpecialties() {
        return specialties.all.map(item=>({id: item.specialtyId, name: item.specialtyName, disciplines: item.disciplines}   
        ))
    }
    
    return (
        <Card className="Card " style={{backgroundColor: '#A1BDE333'}}>
            <AdminTitle title="Добавяне на нова специалност"/>
            <form 
                className="m5-3 article_form"
                onSubmit={specialtyAddFormik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{width: '50%'}}
                        name="specialtyName"
                        label="Име на нова специалност"
                        variant="outlined"
                        {...specialtyAddFormik.getFieldProps('name')}
                        {...errorHelper(specialtyAddFormik, 'name')}
                        />

                    <div className="mt-2">
                        <Button variant="contained" color="primary" type="submit"
                        size="large" disabled={!specialtyAddFormik.isValid}>
                            Добави
                        </Button>
                    </div>
                </div>

            </form>
            <AdminTitle title="Промяна на специалност"/>
                <form
                 className="m5-3 article_form"
                 onSubmit={specialtyEditFormik.handleSubmit}
                >
                    <div className="form-group">
                        <Autocomplete
                            style={{maxWidth: '50%'}}
                            onChange={(event, value) => selectSpecialty({id: value.id, name: value.name, disciplines: value.disciplines})}
                            getOptionLabel={(option) => option.name}
                            disablePortal
                            options={allSpecialties()}
                            isOptionEqualToValue={(option, value)=> option.name === value.name}
                            renderInput={(params) => <TextField {...params} label="Специалност" />}
                            
                        />
                    </div>
                    <div  className="form-group">
                        <TextField
                            style={{width: '50%'}}
                            name="specialtyName"
                            label="Промяна на името на специалност"
                            variant="outlined"
                            value={specialty.name}
                            {...specialtyEditFormik.getFieldProps('specialtyName')}
                            {...errorHelper(specialtyEditFormik, 'specialtyName')}
                        />
                    </div>
                    
                    <div  className="form-group">
                        <InputLabel>Семестър</InputLabel>
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
                    </div>

                    <div  className="form-group">
                        <Autocomplete
                            style={{maxWidth: '50%'}}
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
                                label="Дисциплини"
                            />
                            )}
                        />
                    </div>

                    <div className="mt-2">
                        <Button variant="contained" color="primary" type="submit"
                        size="large" disabled={!specialtyEditFormik.isValid}>
                            Промени
                        </Button>
                    </div>
                </form>

        </Card>
    )
}

export default AddSpecialty;