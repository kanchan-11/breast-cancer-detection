import React, { useEffect } from 'react'
import { Divider, Avatar, MenuItem, Menu, Button } from '@mui/material';
import PatientCard from '../patient/PatientCard';
import { useDispatch, useSelector } from 'react-redux';
import { createPatientAction, getUserPatientAction } from '../../redux/patient/patient.action';
import PatientData from '../patient/PatientData';
import { Route, Routes, useLocation } from "react-router-dom"

const MiddlePart = () => {
  const dispatch = useDispatch()
  // const { auth } = useSelector(store => store)
  const { patient } = useSelector(store => store)
  const jwt = localStorage.getItem("jwt")
  useEffect(() => {
    
    dispatch(getUserPatientAction(jwt))
  }, [])
  console.log("patient store",patient);

  const [selectedPatient, setSelectedPatient] = React.useState(null);
  const handlePatientClick = (patientData) => {
    console.log("patient selected", patientData);
    setSelectedPatient(patientData); 
  };
const addPatientsHandler=()=>{
  createPatientAction()
}
const deletePatientsHandler=()=>{

}

  return (
    <div className='px-20'>
      <section className='py-5 flex  items-center p-5 rounded-b-md'>
        <Avatar className="flex flex-col items-center mr-4 cursor-pointer"
          sx={{ width: "5rem", height: "5rem" }}
          src='https:cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png' />
      </section>
      <div className='mt-5 space-y-5'>
        {patient.patients.map((item) => <PatientCard
          patient={item}
          onClick={()=>handlePatientClick(item)}
        />)}
      </div>
      <div>
      <Button onClick={addPatientsHandler}>Add patients</Button>
      <Button onClick={deletePatientsHandler}>Delete patients</Button>
        </div>
      {selectedPatient && <PatientData patient={selectedPatient} />}
    </div>
  )

}

export default MiddlePart
