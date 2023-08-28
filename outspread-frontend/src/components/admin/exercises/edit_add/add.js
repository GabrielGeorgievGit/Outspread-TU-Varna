import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminTitle, errorHelper } from "../../../../utils/tools";
import { formValues, validation } from "./validationSchema";

import { useDispatch, useSelector } from "react-redux";
// MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Autocomplete, Checkbox } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { DateTimePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { addExercise, editExercise, getAllRooms } from "../../../../store/actions/exercises";
import { getAllDisciplines, getAllSpecialties } from "../../../../store/actions/specialties";
import { getAllUsers, isAuth } from "../../../../store/actions/users";
import dayjs from "dayjs";

const AddExercise = ({isUser, edit, exercise}) => {
    const dispatch = useDispatch();

    const exercises = useSelector(state => state.exercises)
    const allUsers = useSelector(state => state.usersGet)
    const specialties = useSelector(state => state.specialties)
    const users = useSelector(state => state.users);

    useEffect(()=>{
        dispatch(getAllUsers())
        dispatch(getAllSpecialties())
        dispatch(getAllDisciplines())
        dispatch(getAllRooms())
        dispatch(isAuth())
        // dispatch(getAllDisciplines())
    },[dispatch])

    const [selectedUser, setSelectedUser] = useState({});
    const [selectedDiscipline, setSelectedDiscipline] = 
        useState(edit === true ? {name:exercise.discipline, id: exercise.disciplineId} : {});
    const [selectedRoom, setSelectedRoom] = useState(edit === true ? {name: exercise.room} : {});

    const [autoRoom, setAutoRoom] = useState(false);
    const [dateTime, setDateTime] = useState();
    const [duration, setDuration] = useState();

    const actorsValue = useRef('');
    let navigate = useNavigate();

    const editValues = {
        title: exercise.title,
        discipline: exercise.discipline,
        description: exercise.info,
        time: exercise.time,
        duration: exercise.duration,
        room: exercise.room,
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: edit === true ? editValues : formValues,
        validationSchema: validation,
        onSubmit: (values) => {
            // console.log(values,selectedUser, selectedDiscipline, dateTime, duration, selectedRoom)
            if(edit === true) {
                dispatch(editExercise({id: exercise.id, ownerId: exercise.ownerId, disciplineId: selectedDiscipline.id,
                    title: values.title, info: values.description,
                     time: dateTime, duration: duration, room: autoRoom === true ? -1 : selectedRoom.name}))
               .unwrap()
               .then(()=>{
                   navigate('/admin/exercises');
               })
            } else if(isUser === true) {
                dispatch(addExercise({idOwner: users.data.id, idDiscipline: selectedDiscipline.id,
                    title: values.title, description: values.description,
                     time: dateTime, duration: duration, room: -1}))
               .unwrap()
               .then(()=>{
                   navigate('/');
               })
            }
            else {
                dispatch(addExercise({idOwner: selectedUser.id, idDiscipline: selectedDiscipline.id,
                    title: values.title, description: values.description,
                    time: dateTime, duration: duration, room: autoRoom === true ? -1 : selectedRoom.id}))
                .unwrap()
                .then(()=>{
                    navigate('/admin/exercises')
                })
            }
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

    function getEditTime(edit) {
        const dateTime = edit.split('T');
        const date = dateTime[0].split('-');
        const time = dateTime[1].substring(0, 5);
        
        return date[2] + '-' + date[1] + '-' + date[0] + ' ' + time;
    }

    function setTime() {
        if(exercise.time === null) return null;
        return exercise.time.substring(0, 11) + exercise.duration;
    }

    return (
        <>
            <AdminTitle title= {edit === true ? "Edit exercise" : "Add exercise"}/>
            
            <form className="m5-3 article_form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                <Autocomplete
                    hidden={isUser === true || edit === true}
                    onChange={(event, value) => setSelectedUser(value)}
                    getOptionLabel={(option) => getUserDisplay(option)}
                    disablePortal
                    options={allUsers.data}
                    isOptionEqualToValue={(option, value)=> option.name === value.name}
                    renderInput={(params) => <TextField name="" {...params} label="Owner" />}
                    ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                />
                <TextField
                    hidden={edit === false}
                    style={{width: '100%'}}
                    label="Owner"
                    variant="outlined"
                    value={getUserDisplay(allUsers.data.filter(user => {return user.id === exercise.ownerId})[0])}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        style={{width: '100%'}}
                        name="title"
                        label="Enter a title"
                        variant="outlined"
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik, 'title')}
                        />
                </div>

                <div className="form-group">
                    <Autocomplete
                        defaultValue={edit === true ? selectedDiscipline : null}
                        onChange={(event, value) => { setSelectedDiscipline(value);}}
                        getOptionLabel={(option) => option ? option.name : '' }
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
                <div className="form-group">
                {/* <Divider className="mt-3 mb-3"/> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="inlineFilter">
                    <DateTimePicker
                        defaultValue={edit === true ? dayjs(exercise.time) : null}
                        className="inlineFilter"
                        onChange={(e) => setDateTime(getZero(e.$y)+ "-" + getZero(e.$M+1) + "-" + getZero(e.$D) + "T" + getZero(e.$H) + ":" + getZero(e.$m))}//setDateTime(event.target.value)
                        label="Start date and time"
                        format="DD/MM/YYYY HH:mm"
                            views={['year', 'month', 'day', 'hours', 'minutes']}
                    />
                    <div className="inlineFilter"></div>
                    <TimePicker
                        defaultValue={edit === true ? dayjs(setTime()) : null}
                        className="inlineFilter"
                        onChange={(e) => setDuration(getZero(e.$H) + ":" + getZero(e.$m))}//setDuration(event.target.value)}
                        label="Duration"
                        format="hh:mm"
                        ampm={false}
                    />
                    </div>
                </LocalizationProvider>
                </div>

                <div className="form-group">
                    <InputLabel hidden={isUser === true}>
                        Automatically find a free room
                        <Checkbox style={{borderColor: 'transparent'}} checked={autoRoom} onChange={(event) => setAutoRoom(event.target.checked)}/>
                    </InputLabel>

                    <Autocomplete
                        hidden={isUser === true}
                        defaultValue={edit === true ? selectedRoom : null}
                        className="form-group"
                        disabled={autoRoom}
                        onChange={(event, value) => setSelectedRoom(value)}
                        getOptionLabel={(option) => option.name}
                        disablePortal
                        options={exercises.rooms}
                        isOptionEqualToValue={(option, value)=> option.name === value.name}
                        renderInput={(params) => <TextField {...params} label="Room" />}
                        ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                    />
                    {/* <TextField
                        
                        style={{width: '100%'}}
                        name="room"
                        label="Enter a room"
                        variant="outlined"
                        {...formik.getFieldProps('room')}
                        {...errorHelper(formik, 'room')}
                    /> */}
                </div>
            

                <div className="mt-2">
                    <Button variant="contained" color="primary" type="submit"
                    size="large" disabled={!formik.isValid}>
                        {edit === true ? 'Change exercise': 'Add exercise'}
                    </Button>
                </div>

            </form>
        </>
    )
}

export default AddExercise;