// import HomePosts from "./homePosts"
import { useDispatch, useSelector } from 'react-redux';
import { homeExcercises } from "../../store/actions/home"
import { useEffect } from 'react';
import { isAuth } from '../../store/actions/users';
import PaginateExercise from '../admin/exercises/paginate';
import { getAllExercises } from '../../store/actions/exercises';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const exercises = useSelector(state => state.exercises);

    useEffect(() => {
        dispatch(isAuth())
        dispatch(homeExcercises())
        dispatch(getAllExercises())
    },[dispatch])


    return(
        <>
            <h3>Your exercises</h3>
            
            {user.data.exercisesOwned  && user.data.exercisesOwned.length > 1 ?
                <PaginateExercise exercises={user.data.exercisesOwned} userView={true}/>
                :
                <h4>You don't own exercises</h4>
            }

            <h3>Signed exercises</h3>
            {user.data.exercisesSigned  && user.data.exercisesSigned.length > 1 ?
                <PaginateExercise exercises={user.data.exercisesSigned} userView={true}/>
                :
                <h4>You haven't signed for any exercises</h4>
            }

            <hr/>
            <h2>Browse exercises</h2>
            <PaginateExercise exercises={exercises} userView={true}/>
        </>
    )
}

export default Home;