import { Button, Pagination, Table } from "react-bootstrap";
import { Loader } from "../../../utils/tools";
import { getAllSpecialties, getSpecialty } from "../../../store/actions/specialties";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserSemester, getUserSpecialties, getUserSpecialtiesSemester } from "../../../store/actions/users";
import { useDispatch, useSelector } from "react-redux";
const PaginateProfile = ({
    specialtiesMap,
    goToPrevPage,
    goToNextPage,
    goToEdit,
    handleStatusChange,
    handleShow
}) => {
    const dispatch = useDispatch();
    // const [getUsers, setGetUsers] = useState(users);
    const specialties = useSelector(state=>state.specialties)
    const usersGet = useSelector(state=>state.usersGet)

    const [specialtySemester, setSpecialtySemester] = useState({specialty: 1, semester: '1'})
    
    useEffect(()=>{
        dispatch(getAllSpecialties())
        dispatch(getUserSpecialtiesSemester(specialtySemester))
    },[dispatch, specialtySemester])

    return(
        <> 
            <h3>Filters</h3>
            <div class="filters">
                <div class="filterElement">
                    <InputLabel class="filterLabel" id="specialty">Specialty</InputLabel>
                    <Select 
                    class="filterSelect"
                    defaultValue="1"
                    onChange={(event) =>  setSpecialtySemester({...specialtySemester, specialty: event.target.value})}
                    name="specialty"
                    labelId="specialty"
                    >
                        {
                            specialties.all.map(item=>(
                                <MenuItem key={item.specialtyId} value={item.specialtyId}>{item.specialtyName}</MenuItem>
                            ))
                        }
                        
                    </Select>
                </div>
                <div class="filterElement">
                    <InputLabel class="filterLabel" id="semester">Semester</InputLabel>
                    <Select 
                    class="filterSelect"
                    defaultValue="1" 
                    onChange={(event) => setSpecialtySemester({...specialtySemester, semester: event.target.value})}
                    name="semester"
                    labelId="semester"
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                    </Select>
                </div>
            </div>
            { usersGet  ?
                <>
                    <Table striped bordered hover
                    style={{marginTop: "20px"}} >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Fn</th>
                                <th>Specialty</th>
                                <th>Semester</th>
                                <th>User type</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { usersGet.data.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.fullname}</td>
                                    <td>{item.fn ? item.fn : "none"}</td>
                                    <td>{specialtiesMap.get(item.specialtyId)}</td>
                                    <td>{item.semester}</td>
                                    <td>{String(item.role).toLowerCase()}</td>

                                    <td className='bg-success text-white'
                                        onClick={()=> goToEdit(item.id)}
                                    >
                                        Edit
                                    </td>
                                    <td
                                        className="bg-danger text-white"
                                        onClick={()=> alert("Do you want to remove user " + item.username + item.id) }
                                    >
                                        Remove
                                    </td>
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

export default PaginateProfile;