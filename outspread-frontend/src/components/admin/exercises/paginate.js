import { Button, Pagination, Table } from "react-bootstrap";
import { Loader } from "../../../utils/tools";
const PaginateExercise = ({
    exercises,
    goToPrevPage,
    goToNextPage,
    goToEdit,
    handleStatusChange,
    handleShow
}) => {


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
                                <th>Information</th>
                                <th>Start date</th>
                                <th>Duration</th>
                                <th>Room</th>
                                <th>Signed number</th>
                            </tr>
                        </thead>
                        <tbody>
                            { exercises.exercises.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.owner}</td>
                                    <td>{item.title}</td>
                                    <td>{item.dscipline ? item.dscipline : "none"}</td>
                                    <td>{item.info}</td>
                                    <td>{new Date(item.time).toLocaleDateString()}</td>
                                    <td>{String(item.duration).substring(0, 5)}</td>
                                    <td>{item.room}</td>
                                    <td>{item.signed}</td>

                                    <td className='bg-info text-white'
                                        onClick={()=> goToEdit(item.id)}
                                    >View
                                    </td>
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
                                    <td className='action_btn status_btn'
                                        onClick={()=> handleStatusChange(item.status,item.id)}
                                    >
                                        {item.status}
                                    </td>
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