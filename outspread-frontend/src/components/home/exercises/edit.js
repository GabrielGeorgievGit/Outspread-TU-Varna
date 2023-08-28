import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddExercise from "../../admin/exercises/edit_add/add"
import { getExercise } from "../../../store/actions/exercises";
import { Loader } from "../../../utils/tools";
import { Button } from "react-bootstrap";

const EditExercise = () => {
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
            <div className="navigation">
                <Button className="trans ml-5" onClick={() => navigate('/')}>Back to home page</Button>
                <Button className="trans ml-5" onClick={() => navigate('/exercise/' + params.id)}>View exercise</Button>
            </div>
            { current ? 
                <AddExercise isUser={true} edit={true} exercise={current}/>
                :
                <Loader/>
            }
        </>
    )
}
export default EditExercise
;