import * as Yup from 'yup';

export const formValues = {
    teacher: 0,
    title: '',
    discipline: '',
    description: '',
    time: '',
    duration: '',
    room: '',
}

export const validation = () => (
    Yup.object({
        title:Yup.string()
        .required('The title is required')
        .max(100, "The title can't exceed 100 characters"),
        // content:Yup.string()
        // .required('Sorry the content is required')
        // .min(50,'That is it ? ...write some more'),
        // excerpt:Yup.string()
        // .required('Discipline name is required')
        // .max(100,"The discipline name can't exceed 100 characters"),
        // excerpt:Yup.string()
        // .required('Teacher name is required')
        // .max(50,"Teacher name can't exceed 50 characters"),
        date:Yup.string(),//date
        time:Yup.string(),//time
        duration:Yup.string(),//duration
        room:Yup.string()
        .max(20, "Room can't exceed 20 characters"),
        description:Yup.string()
        .max(1000, "Description can't exceed 1000 characters"),
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