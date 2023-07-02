import { AdminTitle } from "../../../utils/tools"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
// import PaginateComponent from './paginate';

import { useDispatch, useSelector } from 'react-redux';


import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


const AdminExercises = () => {

    const exercises = useSelector(state=>state.exercises)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        
    },[])

    return (
        <>
            <AdminTitle title="Exercises"/>
            <div className="exercises_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="me-2">
                        <LinkContainer to='/admin/exercises/add'>
                            <Button variant="secondary">Add exercise</Button>
                        </LinkContainer>
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
                    pagination
                </>
            </div>
        </>
    )
}

export default AdminExercises;