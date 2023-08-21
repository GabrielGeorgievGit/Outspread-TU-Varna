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

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const exercises = useSelector(state => state.exercises);
    const specialties = useSelector(state => state.specialties);

    const [showOwned, setShowOwned] = useState(false);
    const [showSigned, setShowSigned] = useState(false);

    useEffect(() => {
        dispatch(isAuth())
        dispatch(homeExcercises())
        dispatch(getAllExercises())
        dispatch(getSpecialtiesSemester({specialty: user.data.specialtyId, semester: user.data.semester}))
    },[dispatch,user.data.specialtyId, user.data.semester])

    return(
        <>
            {user.data.exercisesOwned && user.data.exercisesSigned ?
            <>
            <div className='showButton'>
                {showOwned ?
                <Button onClick={() => {setShowOwned(false)}}>Hide owned exercises &#40;{user.data.exercisesOwned.length}&#41;</Button>
                :
                <Button onClick={() => {setShowOwned(true)}}>Show owned exercises &#40;{user.data.exercisesOwned.length}&#41;</Button>
                }
            </div>
            <div hidden={!showOwned}>
            <h3>Owned exercises</h3>
            
            {user.data.exercisesOwned  && user.data.exercisesOwned.length > 0 ?
                <PaginateExercise exercises={user.data.exercisesOwned} userView={true} hideFilters={true}/>
                :
                <h4>You don't own exercises</h4>
            }
            </div>

            <hr/>

            <div className='showButton'>
                {showSigned ?
                <Button onClick={() => {setShowSigned(false)}}>Hide signed exercises &#40;{user.data.exercisesSigned.length}&#41;</Button>
                :
                <Button onClick={() => {setShowSigned(true)}}>Show signed exercises &#40;{user.data.exercisesSigned.length}&#41;</Button>
                }
            </div>

            <div hidden={!showSigned}>
            <h3>Signed exercises</h3>
            
            {user.data.exercisesSigned  && user.data.exercisesSigned.length > 1 ?
                <PaginateExercise exercises={user.data.exercisesSigned} userView={true} hideFilters={true}/>
                :
                <h4>You haven't signed for any exercises</h4>
            }
            </div>

            <hr/>
            <h2>Browse exercises</h2>
            <PaginateExercise exercises={exercises.exercises} userView={true} specialtiesData={specialties.data.length > 0 ? specialties.data[0].disciplines.filter(d => d.semester === user.data.semester) : []}/>
            </>
            :
            <Loader/>    
        }   
        </>
    )
}

export default Home;