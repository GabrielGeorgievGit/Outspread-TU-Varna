// import HomePosts from "./homePosts"
import { useDispatch, useSelector } from 'react-redux';
import { homeExcercises } from "../../store/actions/home"

const Home = () => {
    const dispatch = useDispatch();
    dispatch(homeExcercises())
    return(
        <>
            You are home
        </>
    )
}

export default Home