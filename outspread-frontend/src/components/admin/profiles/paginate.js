import { Button, Pagination, Table } from "react-bootstrap";
import { Loader } from "../../../utils/tools";
import { getSpecialty } from "../../../store/actions/specialties";
const PaginateProfile = ({
    users,
    specialtiesMap,
    goToPrevPage,
    goToNextPage,
    goToEdit,
    handleStatusChange,
    handleShow
}) => {

    
    return(
        <> 
            { users  ?
                <>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Fn</th>
                                <th>Specialty</th>
                                <th>Semester</th>
                                <th>User type</th>
                            </tr>
                        </thead>
                        <tbody>
                            { users.data.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.fullname}</td>
                                    <td>{item.fn ? item.fn : "none"}</td>
                                    <td>{specialtiesMap.get(item.specialtyId)}</td>
                                    <td>{item.semester}</td>
                                    <td>{String(item.role).toLowerCase()}</td>

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

export default PaginateProfile;