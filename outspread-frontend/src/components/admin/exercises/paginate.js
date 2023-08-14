import { Button, Pagination, Table } from "react-bootstrap";
import { Loader } from "../../../utils/tools";
import { useNavigate } from "react-router-dom";
const PaginateExercise = ({
    exercises,
    goToPrevPage,
    goToNextPage,
    goToEdit,
    handleStatusChange,
    handleShow,
    userView
}) => {

    const navigate = useNavigate();

    function goToView(item) {
        navigate('/exercise/')
    }

    function convertTime(time) {
        time = time.split(':');
        // if(time[0] === '1') time[0] = time[0] + ' hour'
        // else time[0] = time[0] + ' hours'
        if(time[0].at(0) === '0') time[0] = time[0].at(1);
        time[0] = time[0] + 'h'
        
        if(time[1] === '00') return time[0]
        // if(time[1].at(0) === '0') time[1] = time[1].at(1);
        // if(time[1].at(0) === '1') time[1] = time[1] + ' minute'
        // else time[1] = time[1] + ' minutes'
        time[1] = time[1] + 'min'
        
        return time[0] + (time[1] === '00' ? "null" : (' and ' + time[1]));
    }

    function getDateTime(dateTime) {
        if(dateTime === undefined) return null
        dateTime = dateTime.split('T')
        const date = dateTime[0].split('-');
        let time = dateTime[1].split(':');

        return date[2] + '-' + date[1] + '-' + date[0] + ' at ' + time[0] + ':' + time[1]
    }

    return(
        <> 
            { exercises && exercises.exercises ?
                <>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Owner</th>
                                <th>Title</th>
                                <th>Discipline</th>
                                {/* <th>Information</th> */}
                                <th>Start</th>
                                <th>Duration</th>
                                <th>Room</th>
                                <th>Signed number</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { exercises.exercises.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.owner}</td>
                                    <td>{item.title}</td>
                                    <td>{item.discipline ? item.discipline : "none"}</td>
                                    {/* <td>{item.info}</td> */}
                                    <td>{getDateTime(item.time)}</td>
                                    <td>{convertTime(item.duration)}</td>
                                    <td>{item.room}</td>
                                    <td>{item.signed}</td>

                                    {userView ? 
                                         <td className='bg-success text-white'
                                         onClick={()=> goToView(item.id)}
                                         >
                                         View
                                         </td>
                                        :
                                        <>
                                            <td className='bg-success text-white'
                                            onClick={()=> goToEdit(item.id)}
                                            >
                                            Edit
                                            </td>
                                            <td
                                                className="bg-danger text-white"
                                                onClick={()=> alert(item.id) }
                                            >
                                                Remove
                                            </td>
                                        </>
                                    }
                                    {/* <td className='action_btn status_btn'
                                        onClick={()=> handleStatusChange(item.status,item.id)}
                                    >
                                        {item.status}
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>{/*
                    <Pagination>
                        { exercises.hasPrevPage ?
                            <>
                                <Pagination.Prev 
                                    onClick={()=> goToPrevPage(exercises.prevPage)}
                                />
                                <Pagination.Item
                                    onClick={()=> goToPrevPage(exercises.prevPage)}
                                >
                                    {exercises.prevPage}
                                </Pagination.Item>
                            </>
                            :null
                        }
                        <Pagination.Item active>{exercises.page}</Pagination.Item>
                        { exercises.hasNextPage ?
                            <>
                                <Pagination.Item
                                    onClick={()=> goToNextPage(exercises.nextPage)}
                                >
                                    {exercises.nextPage}
                                </Pagination.Item>
                                <Pagination.Next
                                    onClick={()=> goToNextPage(exercises.nextPage)}
                                />
                            </>
                        :null
                        }

                    </Pagination>*/}
                </>
            :
                <Loader/>
            }


        </>
    )

}

export default PaginateExercise;