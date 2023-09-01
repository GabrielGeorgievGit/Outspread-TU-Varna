import * as Yup from 'yup';

export const formValues = {
    teacher: 0,
    title: '',
    discipline: null,
    description: '',
    time: '',
    duration: '',
    room: '',
}

export const validation = () => (
    Yup.object({
        title:Yup.string()
        .required('Задължително поле')
        .max(100, "Полето не може да надвишава 100 символа"),
        date:Yup.string(),
        time:Yup.string(),
        duration:Yup.string(),
        description:Yup.string()
        .max(1000, "Полето не може да надвишава 1000 символа"),
    })
)