import * as Yup from 'yup';

export const formValues = {
    username: '',
    password: '',
    fullname: '',
    fn: '',
    specialtyId: '',
    semester: '',
    role: ''
}

export const validation = () => (
    Yup.object({
        username:Yup.string()
        .required('The username is required')
        .max(30, "The username can't exceed 30 characters"),
        password:Yup.string()
        .required('Password is required')
        .max(50,"The password can't exceed 50 characters"),
        fullname:Yup.string()
        .required('Full name is required')
        .max(50,"Full name can't exceed 50 characters"),
        fn:Yup.string()
        .required('Faculty number is required')
        .min(8,"The faculty number can't be less than 8 characters")
        .max(8,"The faculty number can't exceed 8 characters"),
        specialtyId:Yup.string()
        .required('Specialty is required')
        .max(100, "The specialty can't exceed 100 characters"),
        semester:Yup.number()
        .required('Semester is required')
        .max(1, "The semester starts from 1")
        .max(8, "The semester can't exceed 8"),
        /*
        score: Yup.number()
        .required('Sorry the score is required')
        .min(0,'0 is the minimum')
        .max(100,'100 is the max'),
        director:Yup.string()
        .required('Sorry the director is required'),
        actors:Yup.array()
        .required('Must have actors')
        .min(3,'Minimum is 3'),
        status:Yup.string()
        .required('Sorry the status is required'),
        */
    })
)