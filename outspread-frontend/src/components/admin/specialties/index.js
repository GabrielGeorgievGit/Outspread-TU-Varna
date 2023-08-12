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
import PaginateSpecialty from "./paginate";
import { getAllSpecialties } from "../../../store/actions/specialties";

const AdminSpecialties = () => {

    const navigate = useNavigate();

    return (
        <>
            <AdminTitle title="Specialties"/>


            <div className="exercises_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="me-2">
                        <LinkContainer to='/admin/specialties/add'>
                            <Button variant="secondary">Add/Edit Specialty</Button>
                        </LinkContainer>
                        
                        <Dropdown className="">
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </ButtonGroup>
                    <form>
                        <InputGroup>
                            <InputGroup.Text id="btngrp1">@</InputGroup.Text>
                            <FormControl
                            type="text"
                            placeholder="Search"
                            />
                        </InputGroup>

                        
                    </form>
                </ButtonToolbar>
                
                <>
                    <PaginateSpecialty/>
                </>
            </div>
        </>
    )
}

export default AdminSpecialties;