import { Card } from '@mui/material';
import AddExercise from '../../admin/exercises/edit_add/add';

const CreateExercise = () => {

    return (
        <Card className="Card " style={{backgroundColor: '#44348b35'}}>
            <AddExercise isUser={true} edit={false} exercise={null}/>
        </Card>
    )
}
export default CreateExercise;