import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminTitle, Loader } from "../../../utils/tools";

import { useDispatch, useSelector } from 'react-redux';

import {
    Button,
    ButtonGroup,
    ButtonToolbar
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getAllSpecialties } from "../../../store/actions/specialties";
import PaginateProfile from "./paginate";
import { Card } from '@mui/material';

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
        <Card className="Card " style={{backgroundColor: '#A1BDE333'}}>
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
        </Card>
        </>
    )
}

export default AdminProfiles;