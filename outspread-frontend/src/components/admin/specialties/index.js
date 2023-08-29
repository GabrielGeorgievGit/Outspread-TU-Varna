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
import { Card } from "@mui/material";

const AdminSpecialties = () => {

    const navigate = useNavigate();

    return (
        <Card className="Card " style={{backgroundColor: '#A1BDE333'}}>
            <AdminTitle title="Specialties"/>


            <div className="exercises_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="me-2">
                        <LinkContainer to='/admin/specialties/add'>
                            <Button variant="secondary">Add/Edit Specialty</Button>
                        </LinkContainer>
                    </ButtonGroup>
                </ButtonToolbar>
                
                <>
                    <PaginateSpecialty/>
                </>
            </div>
        </Card>
    )
}

export default AdminSpecialties;