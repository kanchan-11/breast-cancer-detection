import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { Button, Avatar, Card } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PatientCard from '../../components/patient/PatientCard';
import { useDispatch, useSelector } from "react-redux";
import ProfileModel from './ProfileModel';
import { getUserPatientAction } from '../../redux/patient/patient.action';
import PatientData from '../../components/patient/PatientData';

const tabs = [
  { value: "patients", name: "patients" },
  { value: "positives", name: "positives" },
  { value: "negatives", name: "negatives" }

]

const Profile = () => {

  const dispatch = useDispatch()
  const { id } = useParams()

  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState('patients');
  const { auth, patient } = useSelector(store => store)
  const jwt = localStorage.getItem("jwt")
  useEffect(() => {

    dispatch(getUserPatientAction(jwt))
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const positivePatients = patient.patients.filter(item => item.actualDiagnosis === 1);
  const negativePatients = patient.patients.filter(item => item.actualDiagnosis === 0);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const handlePatientClick = (patientData) => {
       setSelectedPatient(patientData);
      console.log("patient selected", selectedPatient);
      // navigate(`/patients/${patientData.id}`)
  };

  return (
    <Card className='my-10 w-full md:w-[70%] mx-auto'>
      <div className='rounded-md overflow-hidden'>
        <div className='h-full'>
          <div className='h-[15rem]'>
            <img src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
              alt=""
              className='w-full h-full object-cover' />
          </div>
          <div className='px-5 py-5'>
            <div className='flex justify-between items-center'>
              <Avatar className="transform -translate-y-20" sx={{ width: "10rem", height: "10rem" }}
                src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg" />
              {true ? <Button sx={{ borderRadius: "20px" }} onClick={handleOpenProfileModel} variant="outlined">Edit Profile</Button> :
                <Button sx={{ borderRadius: "20px" }} variant="outlined">Follow</Button>}
            </div>
            <div className='p-5'>
              <div>
                <h1 className='py-1 font-bold text-xl'>{auth.user?.firstName + " " + auth.user?.lastName}</h1>
                <p>@{auth.user?.firstName + auth.user?.lastName}</p>
              </div>
              <div className='flex gap-5 items-center py-3'>
                <span>{patient.patients.length} patients</span>
                <span>{positivePatients.length} positive</span>
                <span>{negativePatients.length} negative</span>
              </div>
              <div>
                <p>This is sample text for bio of the user</p>
              </div>
            </div>
            <section>
              <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example"
                >


                  {tabs.map((item) => <Tab value={item.value} label={item.name} wrapped />)}
                </Tabs>
              </Box>
              <div className='flex jusitfy-center'>
                {value === "patients" ? (<div className='space-y-5 w-full my-10'>
                  {patient.patients.map((item) => <div className='border rounded-md border-slate-100'>
                    <PatientCard patient={item} 
                    onClick={() => handlePatientClick(item)}/></div>)}
                </div>) : value === "positives" ? <div className='space-y-5 w-full my-10'>
                  {positivePatients.map((item) => <div className='border rounded-md border-slate-100'><PatientCard patient={item} /></div>)}
                </div> : value === "negatives" ? <div className='space-y-5 w-full my-10'>
                  {negativePatients.map((item) => <div className='border rounded-md border-slate-100'><PatientCard patient={item}/></div>)}
                </div> : ("")}
              </div>
            </section>
          </div>
        </div>
      </div>
      <section>
        <ProfileModel open={open} handleClose={handleClose} userDetails={auth.user} />
      </section>
      <Routes>
                    <Route path="/patients/:id" element={<PatientData  patient={selectedPatient}/>} />
                </Routes>
    </Card>

  )
}

export default Profile