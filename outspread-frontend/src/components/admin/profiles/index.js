import { AdminTitle } from "../../../utils/tools"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl,
    Dropdown
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { getAllUsers, getUserSemester } from "../../../store/actions/users";
import PaginateProfile from "./paginate";
import { getAllSpecialties } from "../../../store/actions/specialties";
import { InputLabel, MenuItem, Select } from "@mui/material";

const AdminProfiles = () => {

   
    const specialties = useSelector(state=>state.specialties)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(()=>{
        dispatch(getAllSpecialties())
    },[dispatch])


    const getSpecialtiesMap = () => {
        const specialtiesMap = new Map();
        specialties.data.forEach(s => specialtiesMap.set(s.specialtyId, s.specialtyName));
        return specialtiesMap;
    }

    return (
        <>
            <AdminTitle title="Profiles"/>

            <div className="exercises_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="me-2">
                        <LinkContainer to='/admin/profiles/add'>
                            <Button variant="secondary">Add new profile</Button>
                        </LinkContainer>
                        
                        {/* <Dropdown className="">
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </ButtonGroup>
                    
                </ButtonToolbar>
                
                <>
                    <PaginateProfile specialtiesMap={getSpecialtiesMap()}/>
                </>
            </div>
        </>
    )
}

export default AdminProfiles;