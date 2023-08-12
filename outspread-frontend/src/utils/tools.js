import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import cookie from 'react-cookies'

export const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
})

export const Loader = () => (
    
    <div className='root_loader'>
        <CircularProgress/>
    </div>
)

export const showToast = (type, msg) => {
    switch(type) {
        case 'SUCCESS':
            toast.success(msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
        case 'ERROR':
            toast.error(msg, {
                position: toast.BOTTOM_RIGHT
            })
            break;
        default:
            return false;
    }
}

export const getTokenCookie = () => cookie.load('final-access-token');
export const removeTokenCookie = () => cookie.remove('final-access-token');//, { path:'*' }
export const getAuthHeader = () => {
    // IMB: If there is no authentication token (the user is not logged in)
    // there is no need to have an Athorization header added with 'undefined' token
    // Previously, when not logged in, the Authorization header looked like: 'Bearer undefined' because 
    // the function accessToken() is not finding an authorization cookie from which to take out the token
    // Changed this to:
    // -- Now we "try" to get the token.
    // -- We check wheter we have a token >> if (accessToken)
    // -- If we have token we build the heareds, if not we send empty object
    const accessToken = getTokenCookie();
    let headers = {};
    if (accessToken) {
        headers = { headers: {'Authorization' : `Bearer ${accessToken}`}};
    }
    return headers;
}

export const AdminTitle = ({title}) => (
    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>{title}</h1>
    </div>
)