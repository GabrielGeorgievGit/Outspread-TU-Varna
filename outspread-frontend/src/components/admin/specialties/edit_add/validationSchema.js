import * as Yup from 'yup';

export const formValues = {
    specialty: '',
    specialties: [],
    discipline: '',
    semester: '',
}

export const validation = () => (
    Yup.object({
        title:Yup.string()
        .required('Задължително поле')
        .max(100, "Полето не може да надвишава 100 символа"),
        excerpt:Yup.string()
        .required('Задължително поле')
        .max(100,"Полето не може да надвишава 100 characters"),
        excerpt:Yup.string()
        .required('Задължително поле')
        .max(50,"Teacher name can't exceed 50 characters"),
    })
)