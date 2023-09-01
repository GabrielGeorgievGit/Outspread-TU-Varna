import { useDispatch, useSelector } from 'react-redux';
import AddExercise from '../../admin/exercises/edit_add/add';
import { useEffect } from 'react';
import { isAuth } from '../../../store/actions/users';
import { Card } from '@mui/material';

const CreateExercise = () => {

    return (
        <Card className="Card " style={{backgroundColor: '#44348b35'}}>
            <AddExercise isUser={true} edit={false} exercise={null}/>
        </Card>
    )
}
export default CreateExercise;