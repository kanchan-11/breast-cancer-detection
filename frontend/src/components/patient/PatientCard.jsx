import React from 'react'
import { Card, CardHeader, Avatar, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deletePatientAction } from '../../redux/patient/patient.action';

const PatientCard = ({ patient, onClick }) => {

    const jwt = localStorage.getItem("jwt")
    const dispatch = useDispatch()

    const handleCardClick = () => {
        onClick(patient);
    };
    const handleDeleteClick = (event,id) => {
        event.stopPropagation()
        if (id) {
            dispatch(deletePatientAction(jwt,id));
          } else {
            console.error("Patient ID is undefined");
          }
    }
    const handleEditClick = (event)=>{
        event.stopPropagation()
    }
    // Function to extract initials from the name
  const getInitials = (firstName,lastName) => {
    
    const firstInitial = firstName ? firstName[0] : '';
  const lastInitial = lastName ? lastName[0] : '';
  return firstInitial + lastInitial;
  };
    return (
        <Card className='w-full mb-2' onClick={handleCardClick} sx={{ backgroundColor: '#f3f4f6' }} variant="outlined">
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {getInitials(patient?.firstName, patient?.lastName)}
                    </Avatar>
                }
                action={
                    <div>
                        <IconButton aria-label="edit" onClick={(event)=>handleEditClick(event)}> {/* Add onClick handler */}
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="delete" onClick={(event)=>handleDeleteClick(event,patient.id)}> {/* Add onClick handler */}
                            <DeleteIcon />
                        </IconButton>
                    </div>

                }
                title={patient?.firstName + " " + patient?.lastName}
                subheader={patient?.gender} />
        </Card>
    )
}

export default PatientCard