import { Button, Pagination, Table } from "react-bootstrap";
import { Loader } from "../../../utils/tools";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllAllSpecialties, getAllSpecialties, getAllSpecialtiesSemester, getSpecialtiesSemester } from "../../../store/actions/specialties";

const PaginateSpecialty = ({
    specialtiesNames,
    goToPrevPage,
    goToNextPage,
    goToEdit,
    handleStatusChange,
    handleShow
}) => {

    const dispatch = useDispatch();
    const specialties = useSelector(state=>state.specialties)
    const [specialty, setSpecialty] = useState(1);
    const [semester, setSemester] = useState('1');

    useEffect(()=>{
        dispatch(getAllAllSpecialties())
        dispatch(getSpecialtiesSemester({specialty: specialty, semester: semester}))
    },[dispatch, specialty, semester])

    return(
        <>
            <div>
                <InputLabel>Specialty</InputLabel>
                    <Select defaultValue="1" onChange={(event) =>  setSpecialty(event.target.value)}
                    name="specialty"
                    label="specialty"
                    >
                        {
                            specialties.all.map(item=>(
                                <MenuItem key={item.specialtyId} value={item.specialtyId}>{item.specialtyName}</MenuItem>
                            ))
                        }
                        
                </Select>

                <InputLabel>Semester</InputLabel>
                <Select defaultValue="1" onChange={(event) => setSemester(event.target.value)}
                name="semester"
                label="semester"
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
            { specialties  ?
                <>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Specialty</th>
                                <th>Discipline</th>
                                <th>Semester</th>
                                {/* <th colSpan={2}>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            { specialties.data.map(item => item.specialtyId === specialty ?
                                item.disciplines.map(discipline => discipline.semester === semester ? (
                                    <tr key={item.id}>
                                        <td>{item.specialtyName}</td>

                                        <td>{discipline.name}</td>
                                        <td>{discipline.semester}</td>
                                    
                                        {/* <td className='bg-success text-white'
                                        onClick={()=> goToEdit(item.id)}
                                        >
                                        Edit
                                        </td>
                                        <td
                                            className="bg-danger text-white"
                                            onClick={()=> alert(item.id) }
                                        >
                                            Remove
                                        </td> */}
                                        {/* <td className='action_btn status_btn'
                                            onClick={()=> handleStatusChange(item.status,item.id)}
                                        >
                                            {item.status}
                                        </td> */}
                                    </tr>
                            ) : null) : null)}
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