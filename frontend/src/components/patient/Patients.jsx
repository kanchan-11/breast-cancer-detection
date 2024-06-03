import React, { useState, useEffect } from 'react'
import { Divider, Avatar, MenuItem, Menu, Button } from '@mui/material';
import PatientCard from '../patient/PatientCard';
import { useDispatch, useSelector } from 'react-redux';
import { createPatientAction, getUserPatientAction } from '../../redux/patient/patient.action';
import PatientData from '../patient/PatientData';
import { Route, Routes, useLocation, useNavigate, Link } from "react-router-dom"

const Patients = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const patients = useSelector(store => store.patient.patients)
    const jwt = localStorage.getItem("jwt")
    useEffect(() => {
        if(jwt)
        dispatch(getUserPatientAction(jwt))
    }, [])
    console.log("patient store", patients)

    const [selectedPatient, setSelectedPatient] = useState(null);
    const handlePatientClick = (patientData) => {
         setSelectedPatient(patientData);
        console.log("patient selected", selectedPatient);
        // navigate(`/patients/${patientData.id}`)
    };
    const addPatientsHandler = () => {
        if(jwt)
        dispatch(createPatientAction(jwt))
    }

    return (
        <div className='px-20 py-20'>
            <div className="flex justify-center">
                <Button
                    onClick={addPatientsHandler}
                    variant="contained"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full w-full"
                >
                    Add New Patients
                </Button>
            </div>
            <div className='mt-5 space-y-5'>
                {patients.map((item) =>
                    <PatientCard
                        key={item.id}
                        patient={item}
                        onClick={() => handlePatientClick(item)}
                    />
                )}
                <Routes>
                    <Route path="/patients/:id" element={<PatientData  patient={selectedPatient}/>} />
                </Routes>
            </div>

            {selectedPatient && <PatientData patient={selectedPatient} />}
        </div>
    )
}

export default Patients