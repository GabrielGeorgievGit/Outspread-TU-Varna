import { useEffect, useState } from "react";
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

    function alreadySigned() {
        return exists(user.exercisesOwned, exercise, 'id') || exists(user.exercisesSigned, exercise, 'id');
    }

    function exists(arr, obj, prop) {
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if(obj[prop] === element[prop]) return true;
        }
        return false;
    }

    return (
        <>
            <div className="navigation">
                <Button >Back to home page</Button>
            </div>
            {
                exercise ?
                <>
                    {/* <h2>View Exercise</h2> */}
                    <h2>{exercise.owner}'s exercise</h2>
                    <h4 className="exerciseInfo">Title: {exercise.title}</h4>
                    <h4>Discipline: {exercise.discipline}</h4>
                    <h4>Description: {exercise.info}</h4>
                    <h4>Start: {getDateTime(exercise.time)}</h4>
                    <h4>Duration: {convertTime(exercise.duration)}</h4>
                    <h4>Room: {exercise.room}</h4>
                    <h4>Signed number: {exercise.signed}</h4>
                    {
                        alreadySigned() ?
                        <Button disabled>Already signed</Button>
                        :
                        <Button onClick={() => signExercise()}>Sign for</Button>
                    }
                    
                </>
                :
                null
            }
            
            

        </>
    )
}
export default ViewExercise;