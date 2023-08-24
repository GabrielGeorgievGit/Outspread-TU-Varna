import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOwnerExercise, getExercise, userSignExercise, userSignOutExercise } from "../../../store/actions/exercises";
import { isAuth } from "../../../store/actions/users";
import { Loader } from "../../../utils/tools";

const ViewExercise = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const exercises = useSelector(state => state.exercises);
    const [exercise, setExercise] = useState();

    const users = useSelector(state => state.users);
    const [user, setUser] = useState();
    const [signed, setSigned] = useState(false);
    const [owned, setOwned] = useState(false);

    useEffect(() => {
        dispatch(isAuth())
        dispatch(getExercise(params.id))
    },[dispatch, owned, signed])

    useEffect(() => {
        setUser(users.data);
    },[users])

    useEffect(() => {
        setExercise(exercises.current);
    },[exercises.current])

    useEffect(() => {
        if(exercise) setSigned(alreadySigned());
        console.log(signed, owned)
    },[exercise, user])

    // useEffect(() => {
    //     if(user && exercise) setOwned(user.id === exercise.ownerId)
    //     if(user && user.exercisesOwned && user.exercisesSigned) {
    //         setSigned(alreadySigned())
    //         console.log(signed)
    //     }
            
    // },[user.exercisesSigned, user.exercisesOwned])

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
        .then((result) => {
            if(result.payload.error === false) setSigned(true);
        })
    }

    function signOutExercise() {
        dispatch(userSignOutExercise({userId: user.id, exerciseId: exercise.id}))
        .then((result) => {
            if(result.payload.error === false) setSigned(false);
        })
    }

    function deleteExercise() {
        dispatch(deleteOwnerExercise({userId: user.id, exerciseId: exercise.id}))
    }

    function alreadySigned() {
        if(exists(user.exercisesSigned, exercise, 'id')) {
            setOwned(false)
            return true;
        }
        if(exists(user.exercisesOwned, exercise, 'id')) {
            setOwned(true)
            return true;
        }
        setOwned(false)
    }

    function exists(arr, obj, prop) {
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            try {
                if(obj[prop] === element[prop]) return true;
            } catch (error) {
                
            }
        }
        return false;
    }

    return (
        <>
            <div className="navigation">
                <Button className="trans" onClick={() => navigate('/')}>Back to home page</Button>
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
                    {/* {console.log(signed, owned)} */}
                    {
                        signed ? owned ? 
                        <>
                            <Button className="trans" disabled>Your exercise</Button>
                            <Button className="trans" style={{backgroundColor: 'red', margin: '5px'}}>Edit exercise</Button>
                            <Button className="trans" style={{backgroundColor: 'red', margin: '5px'}} onClick={() => deleteExercise()}>Delete exercise</Button>
                        </>
                        :
                        <Button className="trans" style={{backgroundColor: 'red'}} onClick={() => signOutExercise()}>Sign out</Button>
                        :
                        <Button className="trans" onClick={() => signExercise()}>Sign for</Button>
                    }
                    
                </>
                :
                <Loader/>
            }
            
            

        </>
    )
}
export default ViewExercise;