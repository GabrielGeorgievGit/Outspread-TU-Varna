import { useEffect, useState } from "react";
import AddExercise from "./add"
import { useDispatch, useSelector } from "react-redux";
import { getExercise } from "../../../../store/actions/exercises";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../../utils/tools";
import { Button } from "react-bootstrap";

const AdminEditExercise = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const exercises = useSelector(state => state.exercises);
    const [current, setCurrent] = useState();

    useEffect(() => {
        dispatch(getExercise(params.id))
    },[dispatch])

    useEffect(() => {
        setCurrent(exercises.current)
    },[exercises.current])

    return (
        <>
            { current ? 
                <AddExercise isUser={false} edit={true} exercise={current}/>
                :
                <Loader/>
            }
        </>
    )
}
export default AdminEditExercise;