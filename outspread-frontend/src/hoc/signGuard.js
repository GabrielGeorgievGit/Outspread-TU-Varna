import { Navigate, useLocation } from "react-router-dom"


const SignGuard = (props) => {
    let location = useLocation();

    return (
        <>
            {
                props.users.auth ?
                    <Navigate to="/" state={{from:location}} replace/>
                :
                props.children

            }
        </>
    );
}


export default SignGuard;