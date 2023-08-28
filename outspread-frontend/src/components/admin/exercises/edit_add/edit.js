import { useEffect, useState } from "react";
import AddExercise from "./add"
import { useDispatch, useSelector } from "react-redux";
import { getExercise } from "../../../../store/actions/exercises";
import { useParams } from "react-router-dom";
import { Loader } from "../../../../utils/tools";

const AdminEditExercise = () => {
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
            <h1>here</h1>
            { current ? 
                <AddExercise isUser={false} edit={true} exercise={current}/>
                :
                <Loader/>
            }
        </>
    )
}
export default AdminEditExercise;