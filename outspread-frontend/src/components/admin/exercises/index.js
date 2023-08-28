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
    FormControl,
    Dropdown
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import PaginateExercise from "./paginate";
import { getAllExercises } from "../../../store/actions/exercises";


const AdminExercises = () => {

    const exercises = useSelector(state=>state.exercises)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getAllExercises())
    },[dispatch])

    return (
        <>
            <AdminTitle title="Exercises"/>
            <div className="exercises_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="me-2">
                        <LinkContainer to='/admin/exercise/add'>
                            <Button variant="secondary">Add exercise</Button>
                        </LinkContainer>
                    </ButtonGroup>
                </ButtonToolbar>
                
                <>
                    <PaginateExercise exercises={exercises.exercises}/>
                </>
            </div>
        </>
    )
}

export default AdminExercises;