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
        .required('Задължително поле')
        .max(30, "Полето не може да надвишава 30 знака"),
        password:Yup.string()
        .required('Задължително поле')
        .max(50,"Полето не може да надвишава 50 знака"),
        fullname:Yup.string()
        .required('Задължително поле')
        .max(50,"Полето не може да надвишава 50 знака"),
        fn:Yup.string()
        // .required('Задължително поле')
        .min(8,"Дължината на полето трябва да бъде 8 символа")
        .max(8,"Дължината на полето трябва да бъде 8 символа"),
        specialtyId:Yup.string()
        .required('Задължително поле')
        .max(100, "Дължината на полето не може да надвишава 100 символа"),
        semester:Yup.number()
        // .required('Задължително поле')
        .min(1, "Семестъра започва от 1")
        .max(8, "Семесъра не надвишава 8")
    })
)