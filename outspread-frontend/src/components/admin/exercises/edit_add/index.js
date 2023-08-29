import { Card } from "@mui/material";
import AddExercise from "./add"

const AdminAddExercise = () => {
    return (
        <Card className="Card " style={{backgroundColor: '#A1BDE333'}}>
            <AddExercise isUser={false} edit={false} exercise={null}/>
        </Card>
    )
}
export default AdminAddExercise;