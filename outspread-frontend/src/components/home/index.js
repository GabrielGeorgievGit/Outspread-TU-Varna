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
            <h4>You are home</h4>

            <h3>Обучаващ в упражнения:</h3>
            
            {user.data.exercisesOwned  && user.data.exercisesOwned.length > 1 ?
                <PaginateExercise exercises={user.data.exercisesOwned}/>
                :
                <h4>Не обучавате по упражнения</h4>
            }

            tuk filtri

            <h5>Browse exercises</h5>
            <PaginateExercise exercises={exercises} userView={true}/>
        </>
    )
}

export default Home;