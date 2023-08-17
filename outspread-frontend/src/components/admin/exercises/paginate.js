import { Button, FormControl, InputGroup, Pagination, Table } from "react-bootstrap";
import { Loader } from "../../../utils/tools";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Autocomplete, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllDisciplines } from "../../../store/actions/specialties";
import { getExercise } from "../../../store/actions/exercises";
const PaginateExercise = ({
    exercises,
    goToPrevPage,
    goToNextPage,
    goToEdit,
    handleStatusChange,
    handleShow,
    userView
}) => {

    const navigate = useNavigate();

    function goToView(item) {
        console.log(item)
        navigate('/exercise')
        dispatch(getExercise(item))
    }

    function convertTime(time) {
        time = time.split(':');
        // if(time[0] === '1') time[0] = time[0] + ' hour'
        // else time[0] = time[0] + ' hours'
        if(time[0].at(0) === '0') time[0] = time[0].at(1);
        time[0] = time[0] + 'h'
        
        if(time[1] === '00') return time[0]
        // if(time[1].at(0) === '0') time[1] = time[1].at(1);
        // if(time[1].at(0) === '1') time[1] = time[1] + ' minute'
        // else time[1] = time[1] + ' minutes'
        time[1] = time[1] + 'min'
        
        return time[0] + (time[1] === '00' ? "null" : (' and ' + time[1]));
    }

    function getDateTime(dateTime) {
        if(dateTime === undefined) return null
        dateTime = dateTime.split('T')
        const date = dateTime[0].split('-');
        let time = dateTime[1].split(':');

        return date[2] + '-' + date[1] + '-' + date[0] + ' at ' + time[0] + ':' + time[1]
    }
    const dispatch = useDispatch();
    const specialties = useSelector(state => state.specialties)

    const [tableData, setTableData] = useState(exercises.exercises);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        dispatch(getAllDisciplines())
    },[dispatch])

    useEffect(()=>{
        setTableData(exercises.exercises)
    },[exercises.exercises])

    function searching(text) {
        setSearchText(text)
        if(String.toString(text).length === 0) {
            setTableData(exercises.exercises);
            return;
        }
        else setTableData(tableData.filter(item => objContains(item, text)))
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

    function filterDiscipline(discipline) {
        if(discipline === null) {
            setTableData(exercises.exercises)
            return;
        }
        
        setTableData(exercises.exercises.filter(item => item.disciplineId === discipline.id))
    }

    function sortByProp(prop) {
        let data = [...tableData]
        data.sort((a, b) => String(a[prop]).localeCompare(String(b[prop])))
        setTableData(data)
    }

    return(
        <> 
            { exercises && exercises.exercises ?
                <>
                {/* {console.log(tableData)}{console.log(specialties.disciplines)} */}
                    <h3>Filters</h3>
                    <InputGroup className="search">
                        <InputGroup.Text id="btngrp1" >@</InputGroup.Text>
                            <FormControl 
                            onChange={(event) => searching(event.target.value)}
                            type="text"
                            placeholder="Search"
                        />
                    </InputGroup>

                    <div className="filters">
                        <div className="filterElement">
                            <Autocomplete
                                className="filterSelect"
                                style= { { minWidth: 300 }}
                                onChange={(event, value) => filterDiscipline(value)}
                                
                                getOptionLabel={(option) => option.name }
                                disablePortal
                                options={specialties.disciplines}
                                isOptionEqualToValue={(option, value)=> option.id === value.id}
                                renderInput={(params) => <TextField name="" {...params} label="Discipline" />}
                                ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                            />
                        </div>
                        <div className="filterElement">
                            
                        </div>

                        <div className="filterElementRight">
                            <Button>Filter by my disciplines</Button>
                        </div>
                    </div>

                    <Table 
                    striped bordered hover >
                        <thead>
                            <tr>
                                <th className="headerSortText" onClick={() => sortByProp("owner")}>Owner <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("title")}>Title <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("discipline")}>Discipline <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("time")}>Start <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("duration")}>Duration <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("room")}>Room <div className="headerSort"/></th>
                                <th className="headerSortText" onClick={() => sortByProp("signed")}>Signed<div className="headerSort"/></th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tableData.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.owner}</td>
                                    <td>{item.title}</td>
                                    <td>{item.discipline ? item.discipline : "none"}</td>
                                    {/* <td>{item.info}</td> */}
                                    <td>{getDateTime(item.time)}</td>
                                    <td>{convertTime(item.duration)}</td>
                                    <td>{item.room}</td>
                                    <td>{item.signed}</td>

                                    {userView ? 
                                         <td className='bg-success text-white'
                                         onClick={()=> goToView(item.id)}
                                         >
                                         View
                                         </td>
                                        :
                                        <>
                                            <td className='bg-success text-white'
                                            onClick={()=> goToEdit(item.id)}
                                            >
                                            Edit
                                            </td>
                                            <td
                                                className="bg-danger text-white"
                                                onClick={()=> alert(item.id) }
                                            >
                                                Remove
                                            </td>
                                        </>
                                    }
                                    {/* <td className='action_btn status_btn'
                                        onClick={()=> handleStatusChange(item.status,item.id)}
                                    >
                                        {item.status}
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>{/*
                    <Pagination>
                        { exercises.hasPrevPage ?
                            <>
                                <Pagination.Prev 
                                    onClick={()=> goToPrevPage(exercises.prevPage)}
                                />
                                <Pagination.Item
                                    onClick={()=> goToPrevPage(exercises.prevPage)}
                                >
                                    {exercises.prevPage}
                                </Pagination.Item>
                            </>
                            :null
                        }
                        <Pagination.Item active>{exercises.page}</Pagination.Item>
                        { exercises.hasNextPage ?
                            <>
                                <Pagination.Item
                                    onClick={()=> goToNextPage(exercises.nextPage)}
                                >
                                    {exercises.nextPage}
                                </Pagination.Item>
                                <Pagination.Next
                                    onClick={()=> goToNextPage(exercises.nextPage)}
                                />
                            </>
                        :null
                        }

                    </Pagination>*/}
                </>
            :
                <Loader/>
            }


        </>
    )

}

export default PaginateExercise;