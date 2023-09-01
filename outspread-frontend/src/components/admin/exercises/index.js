import { useEffect } from 'react';
import { AdminTitle } from "../../../utils/tools";
// import PaginateComponent from './paginate';

import { useDispatch, useSelector } from 'react-redux';


import { Card } from "@mui/material";
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getAllExercises } from "../../../store/actions/exercises";
import PaginateExercise from "./paginate";


const AdminExercises = () => {

    const exercises = useSelector(state=>state.exercises)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllExercises())
    },[dispatch])

    return (
        <Card className="Card " style={{backgroundColor: '#A1BDE333'}}>
            <AdminTitle title="Упражнения"/>
            <div className="exercises_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="me-2">
                        <LinkContainer to='/admin/exercise/add'>
                            <Button variant="secondary">Добави упражнение</Button>
                        </LinkContainer>
                    </ButtonGroup>
                </ButtonToolbar>
                
                <>
                    <PaginateExercise exercises={exercises.exercises}/>
                </>
            </div>
        </Card>
    )
}

export default AdminExercises;