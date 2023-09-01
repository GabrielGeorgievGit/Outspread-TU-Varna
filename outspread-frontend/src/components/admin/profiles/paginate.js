import { InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { FormControl, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpecialties } from "../../../store/actions/specialties";
import { deleteUser, getUserSpecialtiesSemester } from "../../../store/actions/users";
import { Loader } from "../../../utils/tools";
import ModalDialog from "../../popup/modal";

const PaginateProfile = ({
    specialtiesMap,
    goToPrevPage,
    goToNextPage,
    goToEdit,
    handleStatusChange,
    handleShow
}) => {
    const dispatch = useDispatch();
    
    const specialties = useSelector(state=>state.specialties)
    const usersGet = useSelector(state=>state.usersGet)
    
    const [specialtySemester, setSpecialtySemester] = useState({specialty: 1, semester: '1'})
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        dispatch(getAllSpecialties())
        dispatch(getUserSpecialtiesSemester(specialtySemester))
    },[dispatch, specialtySemester])
    
    const [tableData, setTableData] = useState([]);
    
    useEffect(()=>{
        setTableData(usersGet.data)
    },[usersGet.data])

    useEffect(()=>{
        setTableData(usersGet.data.filter(item => objContains(item, searchText)))
    },[searchText])

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

    function deleteUserF(id) {
        dispatch(deleteUser(id))
        setTableData(tableData.filter(user => user.id !== id))
    }

    function remove(user) {
        ModalDialog("Искате ли да изтриете профила '" + user.username + "'(" + user.fullname + ") " + user.fn, 
        deleteUserF, user.id)
    }

    function roleBg(role) {
        if(role === 'teacher') return 'преподавател';
        return 'студент';
    }

    return(
        <>
            <h3>Филтри</h3>
            <InputGroup  className="search">
                <InputGroup.Text id="btngrp1" >@</InputGroup.Text>
                    <FormControl className="bg"
                    onChange={(event) => setSearchText(event.target.value)}
                    type="text"
                    placeholder="Търсене"
                />
            </InputGroup>
            
            <div class="filters">
                <div class="filterElement">
                    <InputLabel class="filterLabel" id="specialty">Специалност</InputLabel>
                    <Select 
                    class="filterSelect"
                    defaultValue="1"
                    onChange={(event) => {setSpecialtySemester({...specialtySemester, specialty: event.target.value});}}
                    name="specialty"
                    labelId="specialty"
                    >
                        {
                            specialties.all.map(item=>(
                                <MenuItem key={item.specialtyId} value={item.specialtyId}>{item.specialtyName}</MenuItem>
                            ))
                        }
                        
                    </Select>
                </div>
                <div class="filterElement">
                    <InputLabel class="filterLabel" id="semester">Семестър</InputLabel>
                    <Select 
                    class="filterSelect"
                    defaultValue="1" 
                    onChange={(event) => {setSpecialtySemester({...specialtySemester, semester: event.target.value}); }}
                    name="semester"
                    labelId="semester"
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
            </div>
            
            { tableData  ?
                <>
                    <Table striped bordered hover
                    style={{marginTop: "20px"}} >
                        <thead>
                            <tr>
                                <th>Име</th>
                                <th>Номер на студент</th>
                                <th>Специалност</th>
                                <th>Семестър</th>
                                <th>Тип на акаунт</th>
                                <th colSpan={2}>Функции</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tableData.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.fullname}</td>
                                    <td>{item.fn ? item.fn : "none"}</td>
                                    <td>{specialtiesMap.get(item.specialtyId)}</td>
                                    <td>{item.semester}</td>
                                    <td>{roleBg(String(item.role).toLowerCase())}</td>

                                    <td className='bg-success text-white click'
                                        hidden
                                        onClick={()=> goToEdit(item.id)}
                                    >
                                        Редактиране
                                    </td>
                                    <td
                                        className="bg-danger text-white click"
                                        onClick={()=> remove(item) }
                                    >
                                     Изтриване
                                    </td>
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

export default PaginateProfile;