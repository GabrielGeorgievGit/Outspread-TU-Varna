// import HomePosts from "./homePosts"
import { useDispatch, useSelector } from 'react-redux';
import { homeExcercises } from "../../store/actions/home"
import { useEffect, useState } from 'react';
import { isAuth } from '../../store/actions/users';
import PaginateExercise from '../admin/exercises/paginate';
import { getAllExercises } from '../../store/actions/exercises';
import { getSpecialtiesSemester } from '../../store/actions/specialties';
import { Button } from 'react-bootstrap';
import { Loader } from '../../utils/tools';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.users);
    const exercises = useSelector(state => state.exercises);
    const specialties = useSelector(state => state.specialties);

    const [showOwned, setShowOwned] = useState(false);
    const [showSigned, setShowSigned] = useState(false);

    useEffect(() => {
        dispatch(isAuth())
        // dispatch(homeExcercises())
        dispatch(getAllExercises())
        dispatch(getSpecialtiesSemester({specialty: user.data.specialtyId, semester: user.data.semester}))
    },[dispatch,user.data.specialtyId, user.data.semester])

    return(
        <>
            {user.data.exercisesOwned && user.data.exercisesSigned ?
            <Card className="Card full" >
            <div className='showButton'>
                {showOwned ?
                <Button className='trans ml-5' onClick={() => {setShowOwned(false)}}>Скрий собствените упражнения &#40;{user.data.exercisesOwned.length}&#41;</Button>
                :
                <Button className='trans ml-5' onClick={() => {setShowOwned(true)}}>Покажи собствените упражнения &#40;{user.data.exercisesOwned.length}&#41;</Button>
                }
                <Button className='ml-5' style={{backgroundColor: 'green'}} onClick={() => { navigate("/create/exercise") }}>Добави свое упражнение</Button>
            </div>
            <div hidden={!showOwned}>
            <h3>Упражнения на които сте собственик</h3>
            
            {user.data.exercisesOwned  && user.data.exercisesOwned.length > 0 ?
                <PaginateExercise exercises={user.data.exercisesOwned} userView={true} hideFilters={true}/>
                :
                <h4>Не притежавате собствени упражнения</h4>
            }
            </div>

            <hr/>

            <div className='showButton'>
                {showSigned ?
                <Button className='trans' onClick={() => {setShowSigned(false)}}>Скрий записани упражнения &#40;{user.data.exercisesSigned.length}&#41;</Button>
                :
                <Button className='trans' onClick={() => {setShowSigned(true)}}>Покажи записани упражнения &#40;{user.data.exercisesSigned.length}&#41;</Button>
                }
            </div>

            <div hidden={!showSigned}>
            <h3>Упражнения за които сте се записали</h3>
            
            {user.data.exercisesSigned  && user.data.exercisesSigned.length > 0 ?
                <PaginateExercise exercises={user.data.exercisesSigned} userView={true} hideFilters={true}/>
                :
                <h4>Не сте се записали за упражнения</h4>
            }
            </div>

            <hr/>
            <h2>Разглеждане на упражнения</h2>
            <PaginateExercise exercises={exercises.exercises} userView={true} specialtiesData={specialties.data.length > 0 ? specialties.data[0].disciplines.filter(d => d.semester === user.data.semester) : []}/>
            </Card>
            :
            <Loader/>    
        }   
        </>
    )
}

export default Home;