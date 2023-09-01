import { Autocomplete, Checkbox, InputLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormControl, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { deleteExercise, getExercise } from "../../../store/actions/exercises";
import { getAllDisciplines } from "../../../store/actions/specialties";
import { Loader } from "../../../utils/tools";
import ModalDialog from "../../popup/modal";
import ViewExercise from "../../home/exercises";

const PaginateExercise = ({
    exercises,
    goToPrevPage,
    goToNextPage,
    handleStatusChange,
    handleShow,
    userView,
    hideFilters,
    specialtiesData
}) => {

    const navigate = useNavigate();
    
    function goToView(item) {
        navigate('/exercise/' + item)
    }

    function goToEdit(item) {
        if(userView === true) {

        }
        else navigate('/admin/exercise/edit/' + item)
    }

    function convertTime(time) {
        if(time === null || time === undefined) return null;
        time = time.split(':');
        if(time[0].at(0) === '0') time[0] = time[0].at(1);
        time[0] = time[0] + 'ч'
        
        if(time[1] === '00') return time[0]
        time[1] = time[1] + 'мин'
        
        return time[0] + (time[1] === '00' ? "няма" : (' и ' + time[1]));
    }

    function getDateTime(dateTime) {
        if(dateTime === undefined || dateTime === null) return null;
        dateTime = dateTime.split('T')
        const date = dateTime[0].split('-');
        let time = dateTime[1].split(':');

        return date[2] + '-' + date[1] + '-' + date[0] + ' от ' + time[0] + ':' + time[1]
    }
    const dispatch = useDispatch();
    const specialties = useSelector(state => state.specialties)
    const user = useSelector(state => state.users)
    
    const [tableData, setTableData] = useState(exercises);
    const [beforeFilter, setBeforeFilter] = useState(tableData);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [searchText, setSearchText] = useState('');
    const [myDisciplineCheck, setMyDisciplineCheck] = useState(false);

    useEffect(()=>{
        dispatch(getAllDisciplines())
    },[dispatch])

    useEffect(()=>{
        setTableData(exercises)
    },[exercises])

    useEffect(() => {
        applyAll()
    },[exercises, selectedDiscipline, searchText, myDisciplineCheck])

    function applyAll() {
        let data = exercises;

        if(myDisciplineCheck) data = (data.filter(item => getDisciplineIds().includes(item.disciplineId)));

        if(selectedDiscipline) {
            data = (data.filter(item => item.disciplineId === selectedDiscipline.id))
        }

        if(searchText) {
            data = (data.filter(item => objContains(item, searchText)));
        }
        setTableData(data)
    }

    function objContains(obj, text) {
        const values = Object.values(obj);
        
        for (let index = 0; index < values.length; index++) {
            let element = values[index];
            
            if(String(element).toLowerCase().includes(text.toLowerCase())) {
                return true
            }
        }
        return false;
    }

    function sortByProp(prop) {
        let data = [...tableData]
        data.sort((a, b) => String(a[prop]).localeCompare(String(b[prop])))
        setTableData(data)
    }

    function getDisciplineIds() {
        return specialtiesData.map(sd => sd.id);
    }

    function cutText(text, size) {
        if(text.length <= size) return text;
        return String(text).substring(0, size) + "...";
    }

    function deleteExerciseF(id) {
        dispatch(deleteExercise(id))
        setTableData(tableData.filter(exercise => exercise.id !== id))
    }

    function remove(exercise) {
        ModalDialog("Искате ли да изтриете упражнението на '" + exercise.owner + "' с заглавие: " + exercise.title, 
        deleteExerciseF, exercise.id)
    }

    return(
        <>
            { exercises ?
                <>
                    <div hidden={hideFilters}>
                        <h3>Филтри</h3>
                        <InputGroup className="search">
                            <InputGroup.Text id="btngrp1" >@</InputGroup.Text>
                                <FormControl className="bg"
                                onChange={(event) => setSearchText(event.target.value)}//searching(event.target.value)}
                                type="text"
                                placeholder="Търсене"
                            />
                        </InputGroup>

                        <div className="filters">
                            <div className="filterElement">
                                <Autocomplete
                                    className="filterSelect"
                                    style= { { minWidth: 400 }}
                                    onChange={(event, value) => setSelectedDiscipline(value)}//filterDiscipline(value)}
                                    
                                    getOptionLabel={(option) => option.name }
                                    disablePortal
                                    options={specialties.disciplines}
                                    isOptionEqualToValue={(option, value)=> option.id === value.id}
                                    renderInput={(params) => <TextField name="" {...params} label="Дисциплина" />}
                                    
                                    ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                                />
                            </div>
                            <div className="filterElement">
                                
                            </div>

                            <div className="filterElementRight" hidden={!userView}>
                                <InputLabel>Филтриране по моите дисциплини
                                    <Checkbox onChange={(event) => {setMyDisciplineCheck(event.target.checked);}}/>
                                </InputLabel>
                            </div>
                        </div>
                    </div>
                    <Table 
                    striped bordered hover >
                        <thead>
                            <tr>
                                <th className="headerSortText" onClick={() => sortByProp("owner")}>Собственик <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("title")}>Заглавие <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("discipline")}>Дисциплина <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("time")}>Начало <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("duration")}>Продължителност <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("room")}>Стая <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("signed")}>Записали се<div className="headerSort"/></th>
                                <th colSpan={2}>Функции</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tableData.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.owner}</td>
                                    <td>{cutText(item.title, 40)}</td>
                                    <td>{item.discipline ? item.discipline : "няма"}</td>
                                    <td>{getDateTime(item.time)}</td>
                                    <td>{convertTime(item.duration)}</td>
                                    <td>{item.room}</td>
                                    <td>{item.signed}</td>

                                    {userView ? 
                                         <td className='bg-success text-white click'
                                         onClick={()=> goToView(item.id)}
                                         >
                                         Отвори
                                         </td>
                                        :
                                        <>
                                            <td className='bg-success text-white click'
                                            onClick={()=> goToEdit(item.id)}
                                            >
                                            Редактирай
                                            </td>
                                            <td
                                                className="bg-danger text-white click"
                                                onClick={()=> remove(item) }
                                            >
                                                Изтрий
                                            </td>
                                        </>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            :
                <Loader/>
            }


        </>
    )

}

export default PaginateExercise;