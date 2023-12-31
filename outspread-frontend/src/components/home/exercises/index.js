import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOwnerExercise, getExercise, userSignExercise, userSignOutExercise } from "../../../store/actions/exercises";
import { isAuth } from "../../../store/actions/users";
import { Loader } from "../../../utils/tools";
import { Card } from "@mui/material";

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
    },[exercise, user])

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
        dispatch(deleteOwnerExercise({ownerId: user.id, exerciseId: exercise.id}))
        navigate('/')
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

    function editExercise() {
        navigate('/exercise/edit/' + params.id)
    }

    return (
        <Card className="Card" style={{backgroundColor: '#44348b35'}}>
            <div className="navigation">
                <Button className="trans" onClick={() => navigate('/')}>Обратно към началната страница</Button>
            </div>
            {
                exercise ?
                <>
                    <div className="exerciseInfos">
                        <h2 className="exerciseTitle">Упражнение на {exercise.owner}</h2>
                        
                        <h4 className="exerciseInfo">Заглавие: {exercise.title}</h4>
                        <h4 className="exerciseInfo">Дисциплина: {exercise.discipline}</h4>
                        <h4 className="exerciseInfo">Описание: {exercise.info}</h4>
                        <h4 className="exerciseInfo">Начало: {getDateTime(exercise.time)}</h4>
                        <h4 className="exerciseInfo">Продължителност: {convertTime(exercise.duration)}</h4>
                        <h4 className="exerciseInfo">Стая: {exercise.room}</h4>
                        <h4 className="exerciseInfo">Брой записали се: {exercise.signed}</h4>
                    </div>
                    {
                        signed ? owned ? 
                        <>
                            <Button className="trans ml-5" disabled>Това е твое упражнение</Button>
                            <Button className="trans ml-5" style={{backgroundColor: 'green'}} onClick={() => editExercise()}>Редактиране</Button>
                            <Button className="trans ml-5" style={{backgroundColor: 'red'}} onClick={() => deleteExercise()}>Изтриване</Button>
                        </>
                        :
                        <Button className="trans ml-5" style={{backgroundColor: 'red'}} onClick={() => signOutExercise()}>Отписване от упражнение</Button>
                        :
                        <Button className="trans ml-5" onClick={() => signExercise()}>Записване за упражнение</Button>
                    }
                    
                </>
                :
                <Loader/>
            }
        </Card>
    )
}
export default ViewExercise;