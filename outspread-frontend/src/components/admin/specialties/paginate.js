import { InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllAllSpecialties, getSpecialtiesSemester } from "../../../store/actions/specialties";
import { Loader } from "../../../utils/tools";

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
            <div class="filters">
                <div class="filterElement">
                    <InputLabel class="filterLabel">Специалност</InputLabel>
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
                </div>

                <div class="filterElement">
                    <InputLabel class="filterLabel">Семестър</InputLabel>
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
            </div>
            { specialties  ?
                <>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Специалност</th>
                                <th>Дисциплина</th>
                                <th>Семестър</th>
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
                                    </tr>
                            ) : null) : null)}
                        </tbody>
                    </Table>
                </>
            :
                <Loader/>
            }


        </>
    )

}

export default PaginateSpecialty;