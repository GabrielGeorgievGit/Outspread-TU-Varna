import { AdminTitle } from "../../../utils/tools"
import { useNavigate } from 'react-router-dom'


import {
    Button,
    ButtonToolbar,
    ButtonGroup,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import PaginateSpecialty from "./paginate";
import { Card } from "@mui/material";

const AdminSpecialties = () => {

    const navigate = useNavigate();

    return (
        <Card className="Card " style={{backgroundColor: '#A1BDE333'}}>
            <AdminTitle title="Специалности"/>


            <div className="exercises_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="me-2">
                        <LinkContainer to='/admin/specialties/add'>
                            <Button variant="secondary">Добави/Промени специалност</Button>
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