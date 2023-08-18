import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignExercise } from "../../../store/actions/exercises";
import { isAuth } from "../../../store/actions/users";

const ViewExercise = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const exercises = useSelector(state => state.exercises);
    const [exercise, setExercise] = useState();

    const users = useSelector(state => state.users);
    const [user, setUser] = useState();

    useEffect(() => {
        setExercise(exercises.current);
    },[exercises])

    useEffect(() => {
        dispatch(isAuth())
    },[dispatch])

    useEffect(() => {
        setUser(users.data);
    },[users])

    function convertTime(time) {
        time = time.split(':');
        if(time[0].at(0) === '0') time[0] = time[0].at(1);
        time[0] = time[0] + 'h'
        
        if(time[1] === '00') return time[0]
        time[1] = time[1] + 'min'
        
        return time[0] + (time[1] === '00' ? "null" : (' and ' + time[1]));
    }

    function getDateTime(dateTime) {
        if(dateTime === undefined) return null
        dateTime = dateTime.split('T')
        const date = dateTime[0].split('-');
        let time = dateTime[1].split(':');

        return date[2] + '-' + date[1] + '-' + date[0] + ' at ' + time[0] + ':' + time[1]
    }

    function signExercise() {
        dispatch(userSignExercise({userId: user.id, exerciseId: exercise.id}))
    }

    return (
        <>
            {
                exercise ?
                <>
                    <h2>View Exercise</h2>
                    <span>Title:</span>{exercise.title}
                    <h2>{exercise.discipline}</h2>
                    <h2>{exercise.owner}</h2>
                    <h2>{exercise.info}</h2>
                    <h2>{getDateTime(exercise.time)}</h2>
                    <h2>{convertTime(exercise.duration)}</h2>
                    <h2>{exercise.room}</h2>
                    <h2>{exercise.signed}</h2>
                    <Button onClick={() => signExercise()}>Sign for</Button>
                </>
                :
                null
            }
            
            

        </>
    )
}
export default ViewExercise;