import { useDispatch, useSelector } from 'react-redux';
import AddExercise from '../../admin/exercises/edit_add/add';
import { useEffect } from 'react';
import { isAuth } from '../../../store/actions/users';

const CreateExercise = () => {

    return (
        <>
            <AddExercise isUser={true} edit={false} exercise={null}/>
        </>
    )
}
export default CreateExercise;