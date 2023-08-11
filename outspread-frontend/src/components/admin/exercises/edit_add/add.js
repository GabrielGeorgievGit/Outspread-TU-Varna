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

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { addExercise } from "../../../../store/actions/exercises";
import { Autocomplete, Checkbox } from "@mui/material";
import { getAllUsers } from "../../../../store/actions/users";
import { getAllDisciplines, getAllSpecialties, getAllSpecialtiesSemester } from "../../../../store/actions/specialties";
import { DateTimePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

const AddExercise = () => {
    const dispatch = useDispatch();

    const exercises = useSelector(state => state.articles)
    const allUsers = useSelector(state => state.usersGet)
    const specialties = useSelector(state => state.specialties)

    useEffect(()=>{
        dispatch(getAllUsers())
        dispatch(getAllSpecialties())
        dispatch(getAllDisciplines())
        // dispatch(getAllDisciplines())
    },[dispatch])

    const [selectedUser, setSelectedUser] = useState({});
    const [selectedDiscipline, setSelectedDiscipline] = useState({});
    const [autoRoom, setAutoRoom] = useState(false);
    const [dateTime, setDateTime] = useState();
    const [duration, setDuration] = useState();

    const actorsValue = useRef('');
    let navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values) => {
            console.log(values,selectedUser, selectedDiscipline, dateTime, duration)
            dispatch(addExercise({idOwner: selectedUser.id, idDiscipline: selectedDiscipline.id,
                 title: values.title, description: values.description,
                  time: dateTime, duration: duration, room: values.room}))
            .unwrap()
            .then(()=>{
                navigate('/admin/exercises')
            })
        }
    })

    function getSpecialtyName(specialtyId) {
        const name = specialties.all.find(element => element.specialtyId === specialtyId)
        return name ? name.specialtyName : null;
    }

    function getUserDisplay(user) {
        if(user === undefined || user === {}) return '';
        const fullname = user.fullname ?? '';
        const spec = user.specialtyId ? getSpecialtyName(user.specialtyId) : '';
        const userFn = user.fn ?? '';
        return fullname + "(" + user.username + ") " + userFn + " " + spec
    }

    function getZero(val) {
        if(val < 10 ) return `0${val}`
        return val
    }

    return (
        <>
            <AdminTitle title="Add exercise"/>
            
            <form className="m5-3 article_form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                <Autocomplete
                    onChange={(event, value) => setSelectedUser(value)}
                    getOptionLabel={(option) => getUserDisplay(option)}
                    disablePortal
                    options={allUsers.data}
                    isOptionEqualToValue={(option, value)=> option.name === value.name}
                    renderInput={(params) => <TextField name="" {...params} label="Owner" />}
                    ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                />
                </div>
                <div className="form-group">
                    <TextField
                        style={{width: '100%'}}
                        name="title"
                        label="Enter a title"
                        variant="outlined"
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik, 'title')}/>
                </div>

                <div className="form-group">
                <Autocomplete
                    onChange={(event, value) => setSelectedDiscipline(value)}
                    getOptionLabel={(option) => option.name}
                    disablePortal
                    options={specialties.disciplines}
                    isOptionEqualToValue={(option, value)=> option.name === value.name}
                    renderInput={(params) => <TextField {...params} label="Discipline" />}
                    ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                />
                </div>

                <div className="form-group">
                    <TextField
                        style={{width: '100%'}}
                        name="description"
                        label="Description"
                        variant="outlined"
                        {...formik.getFieldProps('description')}
                        {...errorHelper(formik, 'description')}
                        multiline
                        rows={4}
                        />
                </div>
                <Divider className="mt-3 mb-3"/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                        onChange={(e) => setDateTime(getZero(e.$y)+ "-" + getZero(e.$M+1) + "-" + getZero(e.$D) + "T" + getZero(e.$H) + ":" + getZero(e.$m))}//setDateTime(event.target.value)
                        label="Start date and time"
                        format="DD/MM/YYYY HH:mm"
                            views={['year', 'month', 'day', 'hours', 'minutes']}
                    />
                    <TimePicker
                        onChange={(e) => setDuration(getZero(e.$H) + ":" + getZero(e.$m))}//setDuration(event.target.value)}
                        label="Duration"
                        format="hh:mm"
                        ampm={false}
                    />
                </LocalizationProvider>

                <div className="form-group">
                    <InputLabel>
                        Automatically find a free room
                        <Checkbox checked={autoRoom} onChange={(event) => setAutoRoom(event.target.checked)}/>
                    </InputLabel>
                    <TextField
                        disabled={autoRoom}
                        style={{width: '100%'}}
                        name="room"
                        label="Enter a room"
                        variant="outlined"
                        {...formik.getFieldProps('room')}
                        {...errorHelper(formik, 'room')}
                    />
                </div>
            

                <div className="mt-2">
                    <Button variant="contained" color="primary" type="submit"
                    size="large" disabled={!formik.isValid}>
                        Add exercise
                    </Button>
                </div>

            </form>
        </>
    )
}

export default AddExercise;