import { Button, Pagination, Table } from "react-bootstrap";
import { Loader } from "../../../utils/tools";

const PaginateSpecialty = ({
    specialties,
    goToPrevPage,
    goToNextPage,
    goToEdit,
    handleStatusChange,
    handleShow
}) => {


    return(
        <> 
            { specialties  ?
                <>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Specialty</th>
                                <th>Discipline</th>
                                <th>Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            { specialties.data.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.specialtyName}</td>
                                     { item.disciplines.map(discipline=>(
                                        <>
                                            <td>{discipline.name}</td>
                                            <td>{discipline.semester}</td>
                                        
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
                                        </>
                                    )) 
                                    }
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

export default PaginateSpecialty;