// import HomePosts from "./homePosts"
import { useDispatch, useSelector } from 'react-redux';
import { homeExcercises } from "../../store/actions/home"
import { useEffect } from 'react';
import { isAuth } from '../../store/actions/users';
import PaginateExercise from '../admin/exercises/paginate';
import { getAllExercises } from '../../store/actions/exercises';
import { getSpecialtiesSemester } from '../../store/actions/specialties';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const exercises = useSelector(state => state.exercises);
    const specialties = useSelector(state => state.specialties);

    useEffect(() => {
        dispatch(isAuth())
        dispatch(homeExcercises())
        dispatch(getAllExercises())
        dispatch(getSpecialtiesSemester({specialty: user.data.specialtyId, semester: user.data.semester}))
    },[dispatch,user.data.specialtyId, user.data.semester])

    return(
        <>
            <h3>Your exercises</h3>
            
            {user.data.exercisesOwned  && user.data.exercisesOwned.length > 0 ?
                <PaginateExercise exercises={user.data.exercisesOwned} userView={true} hideFilters={true}/>
                :
                <h4>You don't own exercises</h4>
            }

            <h3>Signed exercises</h3>
            {user.data.exercisesSigned  && user.data.exercisesSigned.length > 1 ?
                <PaginateExercise exercises={user.data.exercisesSigned} userView={true} hideFilters={true}/>
                :
                <h4>You haven't signed for any exercises</h4>
            }

            <hr/>
            <h2>Browse exercises</h2>
            <PaginateExercise exercises={exercises.exercises} userView={true} specialtiesData={specialties.data.length > 0 ? specialties.data[0].disciplines.filter(d => d.semester === user.data.semester) : []}/>
        </>
    )
}

export default Home;